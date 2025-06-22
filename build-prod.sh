#!/bin/bash

# Function to increment version
increment_version() {
  # Read current version from package.json
  CURRENT_VERSION=$(node -p "require('./package.json').version")
  echo "Current version: $CURRENT_VERSION"

  # Split version into components
  IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"

  # Increment patch version
  VERSION_PARTS[2]=$((VERSION_PARTS[2] + 1))

  # Create new version string
  NEW_VERSION="${VERSION_PARTS[0]}.${VERSION_PARTS[1]}.${VERSION_PARTS[2]}"
  echo "New version: $NEW_VERSION"

  # Update package.json with new version
  npm version "$NEW_VERSION" --no-git-tag-version

  echo "Version updated to $NEW_VERSION"
}

# Increment version
increment_version

# Build the application
npm run build

echo "Build completed with version $(node -p "require('./package.json').version")"
