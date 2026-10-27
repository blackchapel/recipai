# Working on Recipai

Recipai is a free, open-source recipe app (a native Android app) and the
things around it, kept in one repository.

## Repository layout

| Folder | What | Notes |
|---|---|---|
| `android/` | The Android app (Kotlin + Jetpack Compose); Gradle project `:app` | Android-specific rules: `android/CLAUDE.md` |
| `core/` | Shared pure-Kotlin module `:core` (recipe model, scaling, importers, backup format, Drive client) | No Android imports. Unit-tested on the JVM; the future server can reuse it |
| `website/` | Public site: home, privacy policy, terms (React, static) | `website/README.md` |
| `tools/desktop-check/` | Compose Desktop harness that compiles and tests the shared Android UI code without the Android SDK | |
| `docs/` | Design, system state, known gaps, releasing | Read before changing anything (below) |
| `third_party/` | Licenses of bundled third-party material (fonts) | |
| `server/` (planned) | The AI import service | Not created yet |

One Gradle build at the repository root (`settings.gradle.kts`,
`gradlew`) holds `:app` (in `android/`) and `:core`; a future `server/`
joins it so it can share `:core`.

## Branch / PR / merge workflow

- Never push new work directly to `main`. Create a feature branch for it.
- Push the feature branch and let the user run the manual **Android Test
  Release** workflow (`.github/workflows/build-apk.yml`,
  `workflow_dispatch` with a `branch` input) against it themselves.
- Only after the user has tested that build and explicitly approved it,
  open a PR from the feature branch into `main`.
- **Never merge a PR without the user's explicit go-ahead**, even after
  it's open and even if CI on it is green.
- Merging to `main` does **not** trigger a release by itself -- multiple
  PRs merge into `main` over time, and the user separately, manually
  dispatches `.github/workflows/release.yml` (the signed **Android
  Production Release** build, main only) whenever they've decided it's
  time to cut one.
- Only the Android app publishes GitHub Releases, tagged
  `v<major>.<minor>.<patch>`: the app's update check reads the latest
  release and expects that tag. Other components (website, a future server)
  deploy without GitHub Releases.

## Docs: read before writing code, update after

Before starting any change, read all of these -- they're the fastest
way to pick up real context (architecture, what already exists, what's
already known to be broken or risky) without re-deriving it from source
or repeating work already flagged as a gap:

- `README.md` -- user/build-facing: what the app does, how to build it,
  how to test it.
- `docs/SYSTEM_STATE.md` -- technical snapshot: architecture, module
  map, what's implemented, the release pipeline as it actually exists.
- `docs/KNOWN_GAPS.md` -- open limitations/risks. Check this before
  assuming something is unhandled -- it may already be a known,
  deliberate trade-off rather than an oversight.
- `docs/DESIGN.md` -- the approved UI/UX: screens, navigation,
  gestures, haptics, tokens. The interactive reference is
  `docs/design/recipai-prototype.html`. Match it; don't redesign silently.
- `docs/RELEASING.md` -- signing secrets and how to cut a release. Only
  needs a read when touching the pipeline.

Then, any change that touches app behavior, the build, or the release
pipeline updates `README.md`, `docs/SYSTEM_STATE.md` and
`docs/KNOWN_GAPS.md` in the same branch/PR -- don't let them drift. That
includes `docs/KNOWN_GAPS.md`: add newly-found gaps, and remove/update
ones this change actually resolves. If a change deliberately departs
from `docs/DESIGN.md`, update that file too and say so in the PR.

## Website: every feature updates it

Whenever a feature is added, changed or removed -- anything a user of the
app would notice, or anything that changes what the app stores, sends or
shares -- update the website in the same PR:

- **Home page** (`website/src/pages/Home.tsx`): the feature cards and
  sections, the hero copy, and the interactive demo if it is affected.
- **Privacy policy and terms** (`website/src/pages/Privacy.tsx`,
  `Terms.tsx`) whenever data handling, permissions, network calls, SDKs,
  third-party services, what a backup contains, or the usage terms change;
  also bump `policyUpdated` in `website/src/config.ts`. Google's OAuth
  consent screen points at that policy, and it must stay true.
- **Claims that stop being true.** Search the site for statements the change
  contradicts (for example "no AI", "no servers") and fix them.

A feature PR is not done until the website matches it. If a change needs no
website update, say so in the PR description.

## Versioning: decide the semver bump yourself

`android/version.properties` holds only `MAJOR.MINOR` -- PATCH is fully
automatic (the Android Production Release workflow computes it from existing
release tags every run; never edit it by hand). MAJOR/MINOR is not
automatic, and deciding it is your job as part of whichever PR changes
behavior, not the user's:

- **MINOR** bump: any backward-compatible addition or enhancement (a new
  feature, a new option, non-breaking behavior change).
- **MAJOR** bump: a breaking change (removes/renames something a user or
  the pipeline depended on, changes behavior in an incompatible way,
  e.g. a backup file format that older versions can't read).
- **No bump**: a pure fix, refactor, docs-only, website-only, or CI/process
  change with no behavior addition.

Apply the bump to `android/version.properties` as part of the same PR that
earns it -- don't ask the user to classify it, and don't leave it for
release time (release time only ever adds the automatic patch number on top
of whatever MAJOR.MINOR is currently checked in). While the app is
pre-1.0 the base is `0.x`; moving to `1.0` is the user's call.

## Release notes: label PRs so they land in the right section

`.github/release.yml` categorizes the auto-generated release notes by PR
label. When opening a PR, apply whichever of `feature`/`enhancement`,
`fix`/`bug`, `documentation`/`docs`, or
`chore`/`maintenance`/`dependencies`/`ci` actually describes it -- an
unlabeled PR just falls into "Other Changes", which is a worse release
note, not a hard failure.

## Secrets

Signing keys and passwords exist only as GitHub Actions secrets. Never
commit a keystore, a password, or a webhook URL, and never print them
in logs. `docs/RELEASING.md` lists the secrets and how they're created.
