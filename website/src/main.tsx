import { hydrateRoot, createRoot } from "react-dom/client";
import { App } from "./App";
import { stripBase } from "./router";
import "./styles.css";

const root = document.getElementById("root")!;
const app = <App path={stripBase(window.location.pathname)} />;

// Built pages arrive prerendered and are hydrated; the dev server serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
