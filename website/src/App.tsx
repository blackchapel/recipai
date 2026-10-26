import { useEffect } from "react";
import { Footer, Header } from "./components/Layout";
import { findRoute } from "./routes";
import { Router, usePath } from "./router";

function Pages() {
  const route = findRoute(usePath());
  useEffect(() => {
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", route.description);
  }, [route]);
  const Page = route.component;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Page />
      </main>
      <Footer />
    </>
  );
}

export function App({ path }: { path: string }) {
  return (
    <Router initialPath={path}>
      <Pages />
    </Router>
  );
}
