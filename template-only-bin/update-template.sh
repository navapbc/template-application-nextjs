#!/bin/bash
# -----------------------------------------------------------------------------
# This script updates template-application-nextjs in your project. Run
# This script from your project's root directory.
#
# Positional parameters:
#   TARGET_VERSION (optional) – the version of template-application-nextjs to upgrade to.
#     Defaults to main.
# -----------------------------------------------------------------------------
set -euo pipefail

TARGET_VERSION=${1:-"main"}

CURRENT_VERSION=$(cat .template-nextjs-version)

echo "Clone template-application-nextjs"
git clone https://github.com/navapbc/template-application-nextjs.git

echo "Creating patch"
cd template-application-nextjs
git checkout $TARGET_VERSION

# Get version hash to update .template-nextjs-version after patch is successful
TARGET_VERSION_HASH=$(git rev-parse HEAD)

# Note: Keep this list in sync with the files copied in install-template.sh
INCLUDE_PATHS=" \
  .github \
  .grype.yml \
  app \
  docker-compose.yml \
  docs"
git diff $CURRENT_VERSION $TARGET_VERSION -- $INCLUDE_PATHS >patch
cd -

echo "Applying patch"
# Note: Keep this list in sync with the removed files in install-template.sh
EXCLUDE_OPT="--exclude=.github/workflows/template-only-* \
  --exclude=.github/ISSUE_TEMPLATE \
  --exclude=docs/decisions/template.md \
  --exclude=docs/decisions/template \
  --exclude=CODEOWNERS"
git apply $EXCLUDE_OPT --allow-empty template-application-nextjs/patch

echo "Saving new template version to .template-application-nextjs"
echo $TARGET_VERSION_HASH >.template-nextjs-version

echo "Clean up template-application-nextjs folder"
rm -fr template-application-nextjs
