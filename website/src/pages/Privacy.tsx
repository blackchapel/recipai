import { Icon } from "../components/Icon";
import { Contact, LegalPage, type LegalSection } from "../components/Legal";
import { site } from "../config";
import { Link } from "../router";

const glance = [
  "Recipai has no accounts, no ads, no analytics and no tracking, and it has no servers of its own.",
  "Your recipes, photos and settings live in the app's private storage on your phone.",
  "Google Drive backup is optional. If you connect it, Recipai asks only for the drive.file permission, which lets it see just the files it created.",
  "We, the developers, never receive your recipes, photos, Google account details or anything else.",
  "The only other network use: fetching a recipe page you ask it to import (including a link shared into the app), and a quiet check of the latest GitHub release when the app is opened.",
];

const sections: LegalSection[] = [
  {
    id: "who",
    title: "Who this policy is from",
    body: (
      <>
        <p>
          Recipai is a free and open-source recipe app for Android (package <code>{site.androidPackage}</code>),
          published by {site.operator}. This policy explains what the app does with information, in plain language. In
          it, “we” means those maintainers and “the app” means Recipai.
        </p>
        <p>
          Recipai is licensed under the {site.license.name} ({site.license.spdx}); its source code is public at{" "}
          <a href={site.repoUrl} rel="noopener">{site.repoUrl.replace("https://", "")}</a>, so everything below can be
          checked against the code.
        </p>
      </>
    ),
  },
  {
    id: "on-device",
    title: "What the app keeps on your phone",
    body: (
      <>
        <p>
          All of this stays in the app's private storage and is never sent to us. It is removed when you uninstall the
          app or clear its storage.
        </p>
        <div className="table-wrap">
          <table className="data">
            <caption className="sr">Information kept on your phone</caption>
            <thead>
              <tr>
                <th scope="col">What</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Your recipes: titles, ingredients, steps, times, tags, notes, favourites and the web address a recipe was imported from</th>
                <td>It is the app. Stored in one file in the app's private storage.</td>
              </tr>
              <tr>
                <th scope="row">Photos you add to recipes</th>
                <td>
                  Picked with Android's system photo picker (or, on older phones, its system file picker), so the app never gets access to your gallery. Each one is
                  re-saved as a new JPEG of up to 2048 px, which also drops the metadata (such as location) embedded
                  in the original.
                </td>
              </tr>
              <tr>
                <th scope="row">Settings: theme, library layout, haptics, screen-on and timer-sound options, backup options</th>
                <td>To remember how you like the app.</td>
              </tr>
              <tr>
                <th scope="row">If you connect Google Drive: your Google account name and email address, the id of the Drive backup folder, the list of your recent backups (names, dates, sizes) and the status of your last backup</th>
                <td>
                  To show which account is connected, what was backed up and when, and to skip a backup when nothing
                  changed. Kept in a small file on your phone and used nowhere else. No Google access token is saved to
                  disk. Disconnecting wipes this file's contents.
                </td>
              </tr>
              <tr>
                <th scope="row">A temporary copy while a backup or restore runs</th>
                <td>A zip of your recipes and photos is held in the app's cache for the duration, then deleted.</td>
              </tr>
              <tr>
                <th scope="row">Running timers</th>
                <td>Held in memory while they run, so they can finish with the screen off. Not saved.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The app tells Android not to include its data in Android's own cloud backup. If you move to a new phone with
          Android's transfer tool, your recipes and settings can move with it, but the Google Drive connection does not:
          you connect again once.
        </p>
      </>
    ),
  },
  {
    id: "leaves-phone",
    title: "What leaves your phone, and where it goes",
    body: (
      <>
        <p>
          The app makes network requests only in the situations below. None of them goes to a server run by us, and the
          app uses HTTPS only.
        </p>
        <h3>1. Google Drive backup (only if you connect it)</h3>
        <p>
          When you tap Connect, Google's own sign-in and consent screen (handled by Google Play services) asks whether
          Recipai may use Google Drive. If you agree, the app can:
        </p>
        <ul>
          <li>
            create a folder named “Recipai backups” in your Drive and upload backup files to it. Each backup is one
            zip file holding your recipes, your settings, and (if “Include photos” is on) your recipe photos;
          </li>
          <li>list, download, and delete the backup files it created, to show your backups, restore one, and keep only
            the six newest;
          </li>
          <li>read your Google account's display name and email address through Drive, to show who is connected.</li>
        </ul>
        <p>
          Once connected, backups run when you tap Back up now, and also automatically in the background on the
          schedule you choose (daily, weekly, or never), including shortly after the app is opened if one was missed.
          An automatic backup uploads only if your recipes changed, and can be limited to Wi-Fi.
        </p>
        <p>
          The permission requested is <code>{site.driveScope}</code> (“drive.file”). It only lets the app see and
          manage files and folders it created itself. It does not let the app see your other Drive files, your emails,
          contacts or anything else in your Google account. Backups go directly from your phone to Google's servers
          (for example <code>www.googleapis.com</code> and <code>oauth2.googleapis.com</code>); they never pass through
          us. Once in your Drive they are ordinary zip files: Recipai does not add its own encryption, so they are
          protected by your Google account and stored under{" "}
          <a href="https://policies.google.com/privacy" rel="noopener">Google's Privacy Policy</a>.
        </p>
        <h3>2. Importing a recipe from a link (only when you ask)</h3>
        <p>
          When you paste a web address and tap Convert, or share a link to Recipai from another app (which converts it
          straight away), your phone requests that page directly from the website, like a browser would, and reads the
          recipe from it on the device. That website can see the usual details of any visit: your IP address and a
          standard mobile-browser User-Agent string (Recipai does not identify itself to the site). The app sends no
          cookies, accounts or identifiers, and follows redirects (at most six, always over HTTPS). Nothing is sent to
          us, and the page text is not kept unless you save the recipe it produced (a recipe imported from a link
          keeps only the site and path of the address, without any query). Pasted text is processed on the phone and
          never sent anywhere.
        </p>
        <h3>3. Checking for a new version (when the app is opened)</h3>
        <p>
          To show an Update card when a newer release exists, the app asks GitHub for the repository's latest release
          (<code>api.github.com</code>) when it is opened, at most once every ten minutes. This check is anonymous and
          cannot be turned off in the app. The request carries no account, no device identifier and no information about
          you or your recipes; GitHub sees your IP address and the app's name, as with any web request, and handles them
          under{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub's privacy statement</a>.
          If the check fails, nothing is shown. The app never downloads or installs updates by itself; the Update card
          just opens the release page in your browser.
        </p>
        <h3>A prompt for AI chat apps (only if you use it)</h3>
        <p>
          Import has an optional helper that copies a ready-made prompt to your clipboard, so you can use it in an AI chat
          app of your choice. Recipai itself never connects to an AI service and sends nothing for this. What you give
          that app is handled by that app and its provider under their own terms. Recipai only sees what you paste back
          into Import, and reads it on your phone.
        </p>
        <h3>Notifications</h3>
        <p>
          If you allow notifications, the app shows them for running timers. They are created on your phone and involve
          no network.
        </p>
      </>
    ),
  },
  {
    id: "google-data",
    title: "Google user data: access, use, sharing and Limited Use",
    body: (
      <>
        <p>This section covers the information the app receives from Google APIs, if you choose to connect Google Drive.</p>
        <ul>
          <li>
            <b>What we access.</b> Files and folders created by the app in your Drive (its backups), and your Google
            account's display name and email address, as described above. Nothing else.
          </li>
          <li>
            <b>How we use it.</b> Only to provide the backup and restore features you asked for, and to show which
            account is connected. Your recipe data in a backup is used only to be restored into the app.
          </li>
          <li>
            <b>Sharing.</b> We do not sell, rent, share or transfer Google user data to anyone. We never receive it: it
            moves only between your phone and Google, and nobody on the Recipai team can read it. Backups sit in your
            own Drive as ordinary, unencrypted zip files under your Google account's protection.
          </li>
          <li>
            <b>Advertising and AI.</b> Google user data is not used for advertising, profiling, or to train any machine
            learning model. The app has no AI features that use it.
          </li>
          <li>
            <b>Storage and protection.</b> On your phone, only your account name, email address, the backup
            folder's id and your recent backups' details are saved, in the app's private storage. Backups live in your own Drive. Access tokens are issued by Google Play
            services when needed and are not saved by the app.
          </li>
        </ul>
        <p className="callout">
          <Icon name="shield" size={18} />
          <span>
            Recipai's use and transfer to any other app of information received from Google APIs will adhere to the{" "}
            <a href={site.googleApiPolicyUrl} rel="noopener">Google API Services User Data Policy</a>, including the
            Limited Use requirements.
          </span>
        </p>
      </>
    ),
  },
  {
    id: "never",
    title: "What the app never does",
    body: (
      <ul>
        <li>No accounts or sign-up with us. The only account involved is your own Google account, if you connect Drive.</li>
        <li>No analytics, advertising, crash-reporting or tracking libraries, and no advertising identifiers.</li>
        <li>No developer servers, so there is nowhere for us to collect, store or sell your data.</li>
        <li>No reading of your contacts, location, messages, microphone, camera or gallery. Photos you choose come through Android's system photo picker, one selection at a time.</li>
        <li>No fonts, scripts or images loaded from third parties; the fonts are bundled in the app. This website follows the same rule and sets no cookies.</li>
      </ul>
    ),
  },
  {
    id: "permissions",
    title: "Android permissions",
    body: (
      <div className="table-wrap">
        <table className="data">
          <caption className="sr">Permissions the app requests</caption>
          <thead>
            <tr>
              <th scope="col">Permission</th>
              <th scope="col">Used for</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">Internet, network state</th><td>Link import, Google Drive backup, the update check, and waiting for Wi-Fi if you chose “Wi-Fi only” backups.</td></tr>
            <tr><th scope="row">Notifications (Android 13+)</th><td>Showing running and finished timers. Asked once, the first time you start a timer.</td></tr>
            <tr><th scope="row">Foreground service, wake lock</th><td>Keeping a timer running accurately with the screen off.</td></tr>
            <tr><th scope="row">Vibrate</th><td>Haptic feedback, which you can turn off in Settings.</td></tr>
            <tr><th scope="row">Run at startup</th><td>Added by Android's background-work library: lets scheduled backups be re-armed after the phone restarts.</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "retention",
    title: "Keeping and deleting your data",
    body: (
      <>
        <p>You are in control of every copy:</p>
        <ul>
          <li>
            <b>On your phone:</b> delete a recipe in the app, or uninstall the app (or clear its storage in Android
            settings) to remove everything it holds.
          </li>
          <li>
            <b>In Google Drive:</b> backups stay in your Drive until you delete them or the app replaces them: after
            each successful backup it deletes the oldest backups it created beyond the six newest (and deletes at once
            a backup that fails its size check after upload). You can also delete the “Recipai backups” folder yourself in Drive at any
            time. Restoring a backup first saves a “Before restore” copy of your current recipes, which counts as one
            of those backups.
          </li>
          <li>
            <b>Disconnecting:</b> choose Disconnect on the app's Backup page to stop backups, wipe the stored account
            details and backup list from your phone and, if your phone is online, ask Google to revoke the app's
            access. If that request fails, or any time you like, you can remove Recipai's access yourself at{" "}
            <a href={site.googlePermissionsUrl} rel="noopener">myaccount.google.com/permissions</a>. Disconnecting does
            not delete backups already in your Drive; delete them there if you want them gone.
          </li>
        </ul>
        <p>We hold no copy of your data, so there is nothing for us to delete on our side.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Recipai is a general recipe tool and is not directed at children. Because the app collects no personal
        information, it knows nothing about the age of the person using it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If the app starts handling information differently, this page will be updated before the change ships, and the
        “last updated” date above will change. The page's full history is public in the{" "}
        <a href={site.websiteSourceUrl} rel="noopener">repository</a>. Changes that would use Google user data in a new
        way would be made only with your consent.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <Contact />
        <p>
          See also the <Link to="/terms">terms of service</Link>.
        </p>
      </>
    ),
  },
];

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      other={{ to: "/terms", label: "Terms of service" }}
      intro={
        <>
          <p>
            Recipai is built so that your recipes stay yours. The short version:
          </p>
          <ul className="glance">
            {glance.map((g) => (
              <li key={g}>
                <Icon name="check" size={18} />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </>
      }
      sections={sections}
    />
  );
}
