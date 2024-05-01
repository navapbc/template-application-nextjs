#!/bin/bash
#
# This script installs template-application-nextjs to your project. Run
# This script from your project's root directory.
set -euo pipefail

CUR_DIR=$(pwd)
SCRIPT_DIR=$(dirname $0)
TEMPLATE_DIR="$SCRIPT_DIR/.."

echo "Copy files from template-application-nextjs"
cd $TEMPLATE_DIR
# Note: Keep this list of paths in sync with INCLUDE_PATHS in update-template.sh
cp -r \
  .github \
  .grype.yml \
  app \
  docker-compose.yml \
  docs \
  $CUR_DIR
cd -

echo "Remove files relevant only to template development"
# Note: Keep this list of paths in sync with EXCLUDE_OPT in update-template.sh
rm .github/workflows/template-only-*
rm -rf .github/ISSUE_TEMPLATE
rm -rf docs/decisions/template
rm docs/decisions/template.md
