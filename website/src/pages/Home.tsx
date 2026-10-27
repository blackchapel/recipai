import { BackupArt, ImportArt, PhoneRecipe, Sparkle } from "../components/Art";
import { GitHubMark, Icon, type IconName } from "../components/Icon";
import { site } from "../config";
import { Link } from "../router";

const features: { icon: IconName; color: string; title: string; body: string }[] = [
  {
    icon: "spark",
    color: "saffron",
    title: "Live scaling",
    body: "Change the servings, or tap ½× to 3×. Amounts turn into sensible units, and step times follow along.",
  },
  {
    icon: "timer",
    color: "paprika",
    title: "Step timers",
    body: "Tap the time in a step to start a countdown. Timers keep running with the screen off.",
  },
  {
    icon: "chef",
    color: "basil",
    title: "Cook mode",
    body: "One step at a time in large type, with the scaled ingredients that step needs.",
  },
  {
    icon: "link",
    color: "ocean",
    title: "Paste or share a link",
    body: "Paste a recipe from a message, or share a link from your browser. Recipai picks out the ingredients, steps and times.",
  },
  {
    icon: "camera",
    color: "sumac",
    title: "Photos and tags",
    body: "Add photos from the system picker, choose a cover, and sort recipes with tags and favourites.",
  },
  {
    icon: "monitor",
    color: "ube",
    title: "Light and dark",
    body: "Follows your phone's theme. Gentle haptics you can turn off. Works fully offline.",
  },
];

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <div className="hero-copy">
            <p className="eyebrow">Free and open-source · Android</p>
            <h1 className="display">
              Your recipes, <em>scaled to fit</em>.
            </h1>
            <p className="lead">
              Recipai keeps your recipes with timed steps, photos and tags. Change any amount and everything else
              follows, step times included. It works offline, has no account and no ads, and your recipes stay on your
              phone.
            </p>
            <div className="cta-row">
              <a className="btn btn-flame" href={site.releasesUrl} rel="noopener">
                <Icon name="download" size={18} />
                Download the APK
              </a>
              <a className="btn btn-ghost" href={site.repoUrl} rel="noopener">
                <GitHubMark size={18} />
                View the source
              </a>
            </div>
            <p className="meta mono">Android 8.0+ · {site.license.spdx} · No tracking</p>
          </div>
          <div className="hero-art">
            <Sparkle className="h1s" style={{ color: "var(--saffron)" }} />
            <Sparkle className="h2s" style={{ color: "var(--sumac)" }} />
            <PhoneRecipe />
            <p className="hint mono">Try the scale buttons</p>
          </div>
        </div>
      </section>

      <section className="sect" id="features" aria-labelledby="features-h">
        <div className="wrap">
          <p className="eyebrow">What it does</p>
          <h2 className="display" id="features-h">A recipe box that does the maths</h2>
          <ul className="cards">
            {features.map((f) => (
              <li key={f.title} className="card">
                <span className="tile" style={{ ["--tint" as string]: `var(--${f.color})` }}>
                  <Icon name={f.icon} size={22} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sect split" id="import" aria-labelledby="import-h">
        <div className="wrap split-in">
          <div className="split-art">
            <ImportArt />
          </div>
          <div className="split-copy">
            <p className="eyebrow">Import</p>
            <h2 className="display" id="import-h">Paste a recipe, or share a link</h2>
            <p>
              Copy a recipe from a message or a website, or share a link to Recipai from your browser. It reads the
              recipe card the site publishes, or falls back to the text on the page, and sorts out the ingredients,
              steps and times for you.
            </p>
            <p>
              It runs on your phone with plain rules: no AI service, no API key, and no server of ours in between. You
              review and edit the result before anything is saved.
            </p>
          </div>
        </div>
      </section>

      <section className="sect split reverse" id="backup" aria-labelledby="backup-h">
        <div className="wrap split-in">
          <div className="split-art">
            <BackupArt />
          </div>
          <div className="split-copy">
            <p className="eyebrow">Backup · optional</p>
            <h2 className="display" id="backup-h">Safe in your own Google Drive</h2>
            <p>
              Connect your Google account and Recipai saves your recipes, photos and settings to a “Recipai backups”
              folder in <em>your</em> Drive, daily, weekly or when you tap. The six newest backups are kept, and you
              can restore any of them. Skip it and your recipes never leave your phone.
            </p>
            <ul className="ticks">
              <li>
                <Icon name="shield" size={18} />
                <span>
                  <b>Only its own files.</b> Recipai asks for the narrowest Drive permission,{" "}
                  <code>drive.file</code>, which lets it see only files it created. It cannot read the rest of your
                  Drive.
                </span>
              </li>
              <li>
                <Icon name="lock" size={18} />
                <span>
                  <b>No server of ours.</b> Backups go from your phone straight to Google. We never receive them, and
                  nobody on the Recipai team can read them: they sit in your own Drive.
                </span>
              </li>
              <li>
                <Icon name="cloudUp" size={18} />
                <span>
                  <b>Disconnect any time</b> in the app, or at{" "}
                  <a href={site.googlePermissionsUrl} rel="noopener">your Google account's permissions page</a>.
                </span>
              </li>
            </ul>
            <p className="limited">
              Recipai's use and transfer of information received from Google APIs adheres to the{" "}
              <a href={site.googleApiPolicyUrl} rel="noopener">Google API Services User Data Policy</a>, including the
              Limited Use requirements. Read the full <Link to="/privacy">privacy policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="sect" id="private" aria-labelledby="private-h">
        <div className="wrap">
          <p className="eyebrow">Privacy</p>
          <h2 className="display" id="private-h">Your recipes are yours</h2>
          <ul className="chips" aria-label="Privacy at a glance">
            {["No account", "No ads", "No analytics", "No developer servers", "No data sold or shared"].map((t) => (
              <li key={t}>
                <Icon name="check" size={16} />
                {t}
              </li>
            ))}
          </ul>
          <p className="prose-lead">
            Recipai has no sign-up and no servers. Recipes, photos and settings live in the app's private storage. The
            only network use is the link you ask it to import, Google Drive if you connect it, and a quiet check of the
            latest GitHub release when the app is opened. The <Link to="/privacy">privacy policy</Link> spells out each one.
          </p>
        </div>
      </section>

      <section className="sect split" id="open" aria-labelledby="open-h">
        <div className="wrap open">
          <div>
            <p className="eyebrow">Open source</p>
            <h2 className="display" id="open-h">Free software, all the way down</h2>
            <p>
              Recipai is released under the <a href={site.license.url} rel="noopener">{site.license.name}</a>. Read the
              code, build it yourself, fix a bug, or fork it. The fonts are bundled under the SIL Open Font License, and
              this website's code is in the same repository.
            </p>
            <div className="cta-row">
              <a className="btn btn-ghost" href={site.repoUrl} rel="noopener">
                <Icon name="code" size={18} />
                Source code
              </a>
              <a className="btn btn-ghost" href={site.issuesUrl} rel="noopener">
                <Icon name="info" size={18} />
                Report a problem
              </a>
            </div>
          </div>
          <ol className="steps" aria-label="How to install">
            <li>
              <span className="p-n mono">1</span>
              <span>
                <b>Download</b> the APK from the <a href={site.releasesUrl} rel="noopener">latest release</a>.
              </span>
            </li>
            <li>
              <span className="p-n mono">2</span>
              <span>
                <b>Open it</b> and allow installs from your browser if Android asks.
              </span>
            </li>
            <li>
              <span className="p-n mono">3</span>
              <span>
                <b>Stay current:</b> Recipai shows an Update card in Settings when a newer release exists. Installing
                it over the old one keeps your recipes.
              </span>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
