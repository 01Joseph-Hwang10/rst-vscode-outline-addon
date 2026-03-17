---
description: Bumps version and updates changelog for the next release.
---

## User Input

```text
$ARGUMENTS
```

You MUST consider the user input if it is provided.

The user might provide a specific type of version bump, such as "patch", "minor", or "major". If it's not provided, follow the steps below to determine the appropriate version bump type based on the changes since the last release. If you cannot determine the version bump type, default to "patch".

## Outline

1. **Determine the version bump type**: Check the user input for the version bump type. If it's not provided, default to "patch".

2. **Review the project structure**: Familiarize yourself with the project's structure, including source code, documentation, and existing changelog files.

3. **Determine the version bump type based on changes**: If the user did not specify a version bump type, analyze the changes made since the last release. Look for commit messages, pull requests, or any documentation that indicates whether the changes are bug fixes (patch), new features (minor), or breaking changes (major). You can identify the last release by looking at the latest tag in the git commit history.

4. **Update the version number**: Based on the determined version bump type, update the version number in `package.json` or any relevant files that contain the version information.

5. **Generate the changelog**: Create a new entry in the `CHANGELOG.md` file that includes the new version number, release date, and a summary of changes since the last release.

6. **Commit and tag the changes**: Stage the updated files (e.g., `package.json`, `CHANGELOG.md`) and commit them with a message that reflects the version bump, such as "chore: bump version to x.y.z". Then, create a new git tag for the release using the new version number.
