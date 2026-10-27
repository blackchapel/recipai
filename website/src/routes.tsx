import type { ComponentType } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { site } from "./config";

export type Route = { path: string; title: string; description: string; component: ComponentType };

export const routes: Route[] = [
  { path: "/", title: `${site.name}: ${site.tagline}`, description: site.description, component: Home },
  {
    path: "/privacy",
    title: `Privacy policy · ${site.name}`,
    description: `How ${site.name} handles your data: recipes stay on your phone, and Google Drive backup is optional and limited to files the app creates.`,
    component: Privacy,
  },
  {
    path: "/terms",
    title: `Terms of service · ${site.name}`,
    description: `The terms for using ${site.name}, the free and open-source Android recipe app.`,
    component: Terms,
  },
];

export const notFound: Route = {
  path: "/404",
  title: `Page not found · ${site.name}`,
  description: "This page does not exist.",
  component: NotFound,
};

export function findRoute(path: string): Route {
  return routes.find((r) => r.path === path) ?? notFound;
}
