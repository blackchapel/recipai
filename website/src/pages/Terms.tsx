import { Icon } from "../components/Icon";
import { Contact, LegalPage, type LegalSection } from "../components/Legal";
import { site } from "../config";
import { Link } from "../router";

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "What these terms cover",
    body: (
      <>
        <p>
          These terms apply to your use of the Recipai Android app and this website, provided by {site.operator}. By
          installing or using Recipai you agree to them. If you don't agree, please don't use it; you can uninstall it
          at any time.
        </p>
        <p>
          Recipai is a personal recipe box: it stores recipes on your phone, scales their amounts, times steps, imports
          recipes from text or links you provide, and can optionally back them up to your own Google Drive. How it
          handles information is described in the <Link to="/privacy">privacy policy</Link>, which is part of these
          terms.
        </p>
      </>
    ),
  },
  {
    id: "license",
    title: "The software is free software",
    body: (
      <>
        <p>
          Recipai's source code is licensed under the{" "}
          <a href={site.license.url} rel="noopener">{site.license.name}</a> ({site.license.spdx}); the full text is in
          the <a href={site.licenseUrl} rel="noopener">LICENSE file</a> of the repository. That license, not these terms,
          governs what you may do with the code: you may run, study, change and share it under its conditions. Nothing
          here limits the rights the license gives you. If these terms and the license ever conflict about the software
          itself, the license wins.
        </p>
        <p>
          The bundled fonts (Bricolage Grotesque, Geist and Geist Mono) are used under the SIL Open Font License 1.1.
          The name and logo “Recipai” identify this project; please don't present a modified version as the original
          app.
        </p>
      </>
    ),
  },
  {
    id: "content",
    title: "Your recipes and content",
    body: (
      <>
        <p>
          Your recipes, notes and photos belong to you. Recipai does not upload them to us, claims no rights in them,
          and needs no license from you to hold them on your phone. If you back them up, they go to your own Google
          Drive.
        </p>
        <p>
          You are responsible for the content you add. Only import, save and share material you have the right to use.
          Many recipe pages and photos are protected by copyright or by the terms of the site that publishes them;
          importing a link for your own personal use does not give you the right to republish it.
        </p>
      </>
    ),
  },
  {
    id: "drive",
    title: "Google Drive backup",
    body: (
      <>
        <p>
          Connecting Google Drive is optional. If you do, your use of Google's services stays under{" "}
          <a href="https://policies.google.com/terms" rel="noopener">Google's Terms of Service</a>, and Drive's storage
          limits apply. A full Drive can make a backup fail; the app will tell you.
        </p>
        <p>
          A backup is a convenience, not a guarantee. We are not responsible for Google's services being unavailable,
          for files you or others delete from your Drive, or for a backup that is incomplete or can't be restored
          because of something outside the app. Keep your own copy of anything you can't afford to lose. You can
          disconnect at any time, in the app or at{" "}
          <a href={site.googlePermissionsUrl} rel="noopener">your Google account's permissions page</a>.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "Using the app fairly",
    body: (
      <>
        <p>Please don't:</p>
        <ul>
          <li>use the app to break the law or infringe someone else's rights;</li>
          <li>use link import to overload, scrape in bulk, or get around the protections of a website;</li>
          <li>try to disrupt the app, or other people's use of the release and download pages;</li>
          <li>use the project's name, logo or releases to mislead people about who made the software you are offering.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cooking",
    title: "Cooking and food safety",
    body: (
      <p className="callout">
        <Icon name="info" size={18} />
        <span>
          Scaled amounts, converted units and step times are aids, not instructions you must follow blindly. Cooking
          times and doneness don't always scale in a straight line, and imported recipes may contain mistakes. You are
          responsible for food safety, allergens, and checking that a dish is cooked through before you serve it.
        </span>
      </p>
    ),
  },
  {
    id: "warranty",
    title: "No warranty",
    body: (
      <p>
        Recipai is provided “as is” and “as available”, free of charge, without warranties of any kind, express or
        implied, including fitness for a particular purpose, accuracy of imported or scaled recipes, and
        uninterrupted or error-free operation. This mirrors sections 15 and 16 of the {site.license.spdx} license.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limit of liability",
    body: (
      <p>
        To the extent the law allows, the maintainers and contributors are not liable for any indirect, incidental or
        consequential loss, or for lost data, lost recipes or lost profits, arising from your use of the app or this
        website. Nothing in these terms excludes liability that cannot be excluded by law, including for death or
        personal injury caused by negligence or for fraud.
      </p>
    ),
  },
  {
    id: "services",
    title: "Third-party services",
    body: (
      <p>
        The app can talk to services we don't control: Google (sign-in and Drive), GitHub (release checks and
        downloads), and the recipe websites you ask it to read. Those services have their own terms and privacy
        policies, and we are not responsible for them. Recipai is not affiliated with or endorsed by Google or GitHub.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Updates and changes",
    body: (
      <>
        <p>
          The app changes over time: features may be added, changed or removed, and updates are installed by you from
          the releases page. We may update these terms; the “last updated” date above shows when, and the page's
          history is public in the <a href={site.websiteSourceUrl} rel="noopener">repository</a>. Using the app after a
          change means you accept the new terms. If a change doesn't suit you, you can stop using the app and uninstall
          it; the privacy policy explains how to remove your data.
        </p>
        <p>If any part of these terms turns out to be unenforceable, the rest still applies.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <Contact />,
  },
];

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      other={{ to: "/privacy", label: "Privacy policy" }}
      intro={
        <p>
          Plain terms for a free, open-source app. The short version: it's your recipe box, we don't take your data,
          the code is free software, and it comes without a warranty, so keep your own backups and check your food is
          cooked.
        </p>
      }
      sections={sections}
    />
  );
}
