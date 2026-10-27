import { Plate } from "../components/Art";
import { Link } from "../router";

export function NotFound() {
  return (
    <section className="sect">
      <div className="wrap nf">
        <Plate size={96} />
        <h1 className="display">Nothing on this plate</h1>
        <p className="lead">That page does not exist. Try the home page, or read the privacy policy and terms.</p>
        <div className="cta-row">
          <Link className="btn btn-flame" to="/">Back to home</Link>
          <Link className="btn btn-ghost" to="/privacy">Privacy policy</Link>
        </div>
      </div>
    </section>
  );
}
