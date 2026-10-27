pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "Recipai"
include(":core")
// The Android app lives in android/ (the repository holds several projects side by
// side); the Gradle project keeps the name ":app", so task paths are unchanged.
include(":app")
project(":app").projectDir = file("android")
