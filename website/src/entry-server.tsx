import { renderToString } from "react-dom/server";
import { App } from "./App";
import { findRoute, notFound, routes } from "./routes";

export function render(path: string): string {
  return renderToString(<App path={path} />);
}

export { findRoute, notFound, routes };
