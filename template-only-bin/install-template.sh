#!/bin/bash
set -euo pipefail

echo "Fetch latest version of template-application-nextjs"
git clone --single-branch --branch main --depth 1 git@github.com:navapbc/template-application-nextjs.git

echo "Copy files form template-application-nextjs"
cp -r \
  template-application-nextjs/.github \
  template-application-nextjs/docs \
  template-application-nextjs/app \
  template-application-nextjs/docker-compose.yml \
  .

echo "Clean up template-application-nextjs folder"
rm -fr template-application-nextjs
