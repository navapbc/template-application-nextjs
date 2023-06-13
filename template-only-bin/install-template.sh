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
cp -r \
  .github \
  .grype.yml \
  app \
  docker-compose.yml \
  docs \
  $CUR_DIR
cd -

echo "Remove files relevant only to template development"
rm .github/workflows/template-only-*
rm -rf docs/decisions/template
