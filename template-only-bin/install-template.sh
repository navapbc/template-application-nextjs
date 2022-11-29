#!/bin/bash
set -euo pipefail

echo "Fetch latest version of template-application-nextjs"
git clone --single-branch --branch main --depth 1 git@github.com:navapbc/template-application-nextjs.git

echo "Copy files from template-application-nextjs"
cd template-application-nextjs
cp -r \
  .github \
  docs \
  app \
  docker-compose.yml \
  renovate.json \
  ..
cd ..

echo "Clean up template-application-nextjs folder"
rm -fr template-application-nextjs
