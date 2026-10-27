import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

/**
 * A router as small as the site: three real pages, paths with the base the
 * site is served from. Every page is also prerendered to its own HTML file
 * (scripts/prerender.mjs), so links work without JavaScript and crawlers see
 * the text; this only makes in-site clicks instant.
 */
const base = import.meta.env.BASE_URL; // "/" or "/something/"

/** "/recipai/privacy/" -> "/privacy". */
export function stripBase(pathname: string): string {
  let p = pathname.startsWith(base) ? pathname.slice(base.length - 1) : pathname;
  p = p.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

/** "/privacy" -> "/recipai/privacy/". */
export function hrefFor(path: string): string {
  const clean = path === "/" ? "" : path.replace(/^\//, "") + "/";
  return base + clean;
}

type RouterValue = { path: string; navigate: (path: string) => void };
const RouterContext = createContext<RouterValue>({ path: "/", navigate: () => {} });

export function usePath(): string {
  return useContext(RouterContext).path;
}

export function Router({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const onPop = () => setPath(stripBase(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (next: string) => {
    window.history.pushState(null, "", hrefFor(next));
    setPath(next);
    window.scrollTo(0, 0);
  };

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

/** A link to another page of this site. */
export function Link({ to, onClick, ...rest }: LinkProps) {
  const { navigate } = useContext(RouterContext);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a {...rest} href={hrefFor(to)} onClick={handle} />;
}
