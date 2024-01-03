#!/bin/bash
set -euo pipefail

echo "Fetch latest version of template-application-nextjs"
git clone --single-branch --branch main --depth 1 git@github.com:navapbc/template-application-nextjs.git

echo "Install template"
./template-application-nextjs/template-only-bin/install-template.sh

# Store template version in a file
cd template-application-nextjs
git rev-parse HEAD >../.template-nextjs-version
cd -

echo "Clean up template-application-nextjs folder"
rm -fr template-application-nextjs
