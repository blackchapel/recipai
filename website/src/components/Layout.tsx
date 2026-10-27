import { site } from "../config";
import { Link, usePath } from "../router";
import { GitHubMark, Icon } from "./Icon";
import { Logo } from "./Logo";

export function Header() {
  const path = usePath();
  const current = (p: string) => (path === p ? "page" : undefined);
  return (
    <header className="bar">
      <div className="wrap bar-in">
        <Link to="/" className="brand" aria-label="Recipai home">
          <Logo size={30} />
          <span>Recipai</span>
        </Link>
        <nav aria-label="Main" className="nav">
          <Link to="/privacy" aria-current={current("/privacy")}>Privacy</Link>
          <Link to="/terms" aria-current={current("/terms")}>Terms</Link>
          <a href={site.repoUrl} className="nav-gh" rel="noopener" aria-label="Recipai on GitHub">
            <GitHubMark size={16} />
            <span>GitHub</span>
          </a>
          <a href={site.releasesUrl} className="btn btn-flame btn-sm" rel="noopener">
            <Icon name="download" size={16} />
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <Link to="/" className="brand" aria-label="Recipai home">
            <Logo size={26} />
            <span>Recipai</span>
          </Link>
          <p>A free and open-source recipe app for Android. No account, no ads, no tracking.</p>
        </div>
        <nav aria-label="Footer" className="foot-links">
          <div>
            <h2>App</h2>
            <a href={site.releasesUrl} rel="noopener">Download</a>
            <a href={site.repoUrl} rel="noopener">Source code</a>
            <a href={site.issuesUrl} rel="noopener">Report a problem</a>
          </div>
          <div>
            <h2>Legal</h2>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of service</Link>
            <a href={site.licenseUrl} rel="noopener">License ({site.license.spdx})</a>
          </div>
        </nav>
      </div>
      <div className="wrap foot-note">
        <p>
          Google Drive is a trademark of Google LLC. Recipai is an independent project and is not affiliated with or
          endorsed by Google. This website is open source too: <a href={site.websiteSourceUrl} rel="noopener">its code</a> lives
          in the same repository and sets no cookies and loads nothing from third parties.
        </p>
      </div>
    </footer>
  );
}
