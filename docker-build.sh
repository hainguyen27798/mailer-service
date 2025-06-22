#!/bin/bash

# Read current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

docker build -t "harrynguyen27798/mail-service:$CURRENT_VERSION" .
