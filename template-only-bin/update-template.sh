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

echo "Clone template-application-nextjs"
git clone git@github.com:navapbc/template-application-nextjs.git

# Switch to target version
cd template-application-nextjs
git checkout $TARGET_VERSION
cd -

echo "Install template"
./template-application-nextjs/template-only-bin/install-template.sh

# Restore project files with project-specific configuration that was defined as part of project setup.
# Also restore project files that had lines that were commented out in the template.
# Updates in any of these files need to be manually applied to the projects
echo "Restore modified project files"
git checkout HEAD -- \
  .github/workflows/cd-storybook.yml

# Store template version in a file
cd template-application-nextjs
git rev-parse HEAD >../.template-nextjs-version
cd -

echo "Clean up template-application-nextjs folder"
rm -fr template-application-nextjs
