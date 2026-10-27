# Android app rules

(Repository-wide rules -- branches, PRs, docs, the website, versioning --
are in the root `CLAUDE.md`.)

Recipai is a native Android recipe app (Kotlin + Jetpack Compose). No
cross-platform frameworks: no React Native, no Flutter. (The website in
`website/` is a separate project and is not part of the app.)

## Sandbox constraint

This environment usually cannot compile Kotlin/Android locally (no local
Gradle/Android SDK access) -- GitHub Actions is the only real compiler
check. Review diffs carefully before pushing; a failed CI round-trip
costs several minutes each time. Pure-Kotlin logic (scaling, import
parsing) goes in plain JVM modules/packages with unit tests so CI's
`testDebugUnitTest` step actually exercises it. Shared UI code can also be
compiled and tested here with `tools/desktop-check` (see its README).
