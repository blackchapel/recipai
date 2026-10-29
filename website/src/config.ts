/**
 * The facts the pages state about the project. Change them here, not in the
 * page text. Anything the pages claim about data handling lives in
 * src/pages/Privacy.tsx and must match what the app does (docs/SYSTEM_STATE.md).
 */
const repo = "https://github.com/blackchapel/recipai";

export const site = {
  name: "Recipai",
  tagline: "Your recipes, scaled to fit",
  description:
    "Recipai is a free, open-source Android recipe app: live ingredient scaling, step timers, cook mode, import from pasted text or a link, and optional backup to your own Google Drive. No account, no ads, no tracking.",
  repoUrl: repo,
  releasesUrl: `${repo}/releases/latest`,
  issuesUrl: `${repo}/issues`,
  licenseUrl: `${repo}/blob/main/LICENSE`,
  websiteSourceUrl: `${repo}/tree/main/website`,
  license: {
    name: "GNU General Public License, version 3 or later",
    spdx: "GPL-3.0-or-later",
    url: "https://www.gnu.org/licenses/gpl-3.0.html",
  },
  /** Shown on the policy pages when set. Left empty: contact is through GitHub issues. */
  contactEmail: "",
  /** Who runs the project, as the legal pages name them. */
  operator: "the Recipai maintainers (blackchapel on GitHub)",
  androidPackage: "com.blackchapel.recipai",
  /** Update this when the text of a policy page changes in substance. */
  policyUpdated: "29 October 2026",
  googleApiPolicyUrl: "https://developers.google.com/terms/api-services-user-data-policy",
  googlePermissionsUrl: "https://myaccount.google.com/permissions",
  driveScope: "https://www.googleapis.com/auth/drive.file",
} as const;
