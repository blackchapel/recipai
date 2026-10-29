# Releasing Recipai

How signing works, the secrets the workflows need, and how a release is
cut. See `SYSTEM_STATE.md` for what the workflows do step by step.

## One-time setup

You do these; Claude cannot create keys or set repository secrets.

### 1. Create the signing keystore (on your computer)

```sh
keytool -genkeypair -v \
  -keystore recipai-release.jks \
  -alias recipai \
  -keyalg RSA -keysize 4096 -validity 10000
```

Choose a strong store password and key password (they may be the same).
Fill in the name fields however you like.

**Back it up.** Keep `recipai-release.jks` and both passwords in a password
manager or other offline storage. If you lose this key, you can never
publish an update that installs over existing copies. **Never commit
it** (`.gitignore` blocks `*.jks`).

### 2. Add the repository secrets

GitHub -> the repo -> Settings -> Secrets and variables -> Actions ->
New repository secret:

| Secret | Value |
|---|---|
| `KEYSTORE_BASE64` | the keystore, base64-encoded: `base64 -w0 recipai-release.jks` (macOS: `base64 -i recipai-release.jks`) |
| `KEYSTORE_PASSWORD` | the store password |
| `KEY_ALIAS` | `recipai` (or whatever you passed to `-alias`) |
| `KEY_PASSWORD` | the key password |
| `DISCORD_WEBHOOK_URL` | a Discord channel webhook: the build and release notifications are posted to it (as in RideLink, the notify job fails without it) |

With the GitHub CLI:

```sh
base64 -w0 recipai-release.jks | gh secret set KEYSTORE_BASE64
gh secret set KEYSTORE_PASSWORD
gh secret set KEY_ALIAS
gh secret set KEY_PASSWORD
```

### 3. Get the signing key's SHA-1 (needed for Google Drive backup)

```sh
keytool -list -v -keystore recipai-release.jks -alias recipai | grep SHA1
```

### 4. Google Cloud project (needed for Drive backup)

1. console.cloud.google.com -> create a project -> enable the **Google
   Drive API**.
2. OAuth consent screen: app name Recipai, your support email; add the
   `.../auth/drive.file` scope. (This scope only lets the app see files
   it created.)
3. Credentials -> Create credentials -> OAuth client ID -> **Android**:
   package name `com.blackchapel.recipai` (confirm in the scaffold PR) and
   the SHA-1 from step 3.
4. While the consent screen is in "Testing", add your Google account as
   a test user.

Test and production builds share the same key and package, so one OAuth
client covers both.

### Publishing the OAuth consent screen

While the consent screen is in "Testing", only the test users you list can
connect Drive. To let anyone connect, publish it (and, where Google asks,
get the branding verified). Recipai requests a single scope,
`.../auth/drive.file`, which Google classes as **non-sensitive**, so no
scope-justification video or security assessment should be needed; what
Google checks is the branding and the pages below. The console's own
checklist is the authority if it differs from this list.

1. **Host the site** in `website/` (see `website/README.md`) on a domain you
   control, over HTTPS. Use a custom domain: a shared address such as
   `*.github.io` is often rejected because you can't prove you own it.
   Build with `SITE_URL` set. Confirm `/`, `/privacy/` and `/terms/` open
   without signing in.
2. **Verify the domain** in Google Search Console (a DNS record is the most
   reliable way), as the same Google account that owns the Cloud project, or
   one that is an owner/editor of it.
3. **Google Cloud console -> Google Auth Platform** (older UI: APIs &
   Services -> OAuth consent screen):
   - **Branding:** app name `Recipai` (must match the site's name), user
     support email, app logo (square, 120x120 px or larger, from the app icon
     in `android/src/main/res/drawable/ic_launcher_foreground.xml` / the site's
     `favicon.svg`), **Application home page** = `https://<your domain>/`,
     **Privacy policy** = `https://<your domain>/privacy/`, **Terms of
     service** = `https://<your domain>/terms/`, **Authorized domains** = your
     domain, **Developer contact email**.
   - **Audience:** External, then **Publish app** (status: In production).
   - **Data Access:** add only `.../auth/drive.file`.
4. **Submit for verification** if the console asks (it appears as a
   "Verification center" prompt). Answer with: Recipai is an open-source
   recipe app; it uses `drive.file` to create a "Recipai backups" folder in the
   user's own Drive and store backups there, to list/download/delete only
   those files, and to show the connected account's name and email; nothing
   is sent to the developers. Link the policy section "Google user data:
   access, use, sharing and Limited Use".
5. Reply to any email from Google's verification team; they typically check
   that the home page describes the app, links to the privacy policy, and
   that the policy discloses the Google data use and Limited Use language.

The Android OAuth client (package + SHA-1, step 3 above) is unaffected by
publishing.

## Day to day

1. Work on a feature branch (never `main`).
2. Push it. Actions -> **Android Test Release** -> Run workflow -> enter the
   branch. Download the APK from the run's **Artifacts** and install it.
3. When you've tested and approved it, a PR is opened into `main`
   (labelled `feature`, `fix`, `docs`, `chore` ... so release notes
   group correctly). Review and merge it yourself.
4. Repeat for more changes. Merging releases nothing.

## Cutting a release

**First, the release notes.** They are written in `CHANGELOG.md`, where every
PR has been adding lines under `## Unreleased`. Open a small PR that renames
that heading to `## <version> (<date>)` (the version being cut: `MAJOR.MINOR`
from `android/version.properties` plus the next patch, so `0.1.1` after
`v0.1.0`) and starts a fresh empty `## Unreleased` above it. Merge it. The
workflow publishes that section as the release body and stops before building
if it is missing or empty.

Then Actions -> **Android Production Release** -> Run workflow, with **`main`**
selected as the branch. It:

1. Works out the version: `MAJOR.MINOR` from `android/version.properties`
   plus the next patch for that line (`0.1.0`, then `0.1.1`, ...), and checks
   that `CHANGELOG.md` has notes for it.
2. Runs the unit tests and builds the signed APK.
3. Creates the tag `v<version>` and a GitHub Release whose notes are the
   `CHANGELOG.md` section, followed by GitHub's generated "What's Changed" PR
   list, with `recipai-v<version>.apk` attached.
4. Posts to Discord if configured.

Changing MAJOR.MINOR is done in the PR that earns it (see `CLAUDE.md`),
not at release time. The first release after a bump starts again at
patch 0.

## If something fails

- **"No Gradle project"** -- the app scaffold isn't on that branch yet.
- **"CHANGELOG.md has no notes under a heading ..."** -- do the changelog PR
  above (the error prints the exact heading to use).
- **"Tag ... already exists"** -- someone tagged by hand; delete the stray
  tag or bump MAJOR.MINOR.
- **"Production releases are cut from main only"** -- re-run with `main`.
- **Signing errors** -- check the four signing secrets; `KEYSTORE_BASE64`
  must be a single line with no newlines.
