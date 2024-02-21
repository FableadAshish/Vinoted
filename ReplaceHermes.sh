#!/bin/sh

# Define the Hermes library directory based on the configuration
if [ "$CONFIGURATION" == "Debug" ]; then
  HERMES_LIB_DIR=lib/hermes/Debug
else
  HERMES_LIB_DIR=lib/hermes/Release
fi

# Add the Hermes library to the build
if [ -d "$PROJECT_DIR/$HERMES_LIB_DIR" ]; then
  TARGET_LIB_DIR="$TARGET_BUILD_DIR/$HERMES_BUNDLE_FOLDER_PATH"
  mkdir -p "$TARGET_LIB_DIR"
  cp -R "$PROJECT_DIR/$HERMES_LIB_DIR/