# Changelog

What changed in each release, in plain words for the people using Recipai.
Every pull request that adds, changes or fixes something adds a line under
**Unreleased** (groups: Added, Changed, Fixed, and Project for things around
the app such as the website or the repository). To release, a small PR first
renames "Unreleased" to the version about to be cut (for example
`## 0.1.1 (2026-11-02)`) and starts a fresh "Unreleased" above it; the
**Android Production Release** workflow publishes that section as the release
notes and refuses to run if it is missing.

## Unreleased

### Project
- Added the Recipai website: a home page, a privacy policy and terms of service.
- Reorganised the repository into separate folders for the Android app, the
  shared code, the website and the tools, ready for a server later.
- Release notes now come from this file.

## 0.1.0 (2026-10-20)

The first release: a free, open-source Android recipe app. Your recipes stay
on your phone.

### Added
- **Library:** grid or list, search, tags, sort, favourites, swipe actions and
  a press-and-hold preview.
- **Live scaling:** change the servings or tap ½× to 3×; amounts and step times
  follow.
- **Recipe editor:** ingredients with units and sections, timed steps, tags and
  notes.
- **Step timers and cook mode:** countdowns that keep running with the screen
  off, and one step at a time in large type.
- **Import:** paste recipe text or share a link. Rule-based, so there is no AI
  service and no API key.
- **Photos:** added from the system picker, with a cover, a gallery and a
  viewer.
- **Google Drive backup (optional):** daily, weekly or on demand, with restore.
  It uses the narrow `drive.file` permission, so it only sees the files it
  created.
- **Light and dark themes,** gentle haptics, back-swipe navigation, a first-run
  welcome tour, and an Update card in Settings when a newer release exists.
