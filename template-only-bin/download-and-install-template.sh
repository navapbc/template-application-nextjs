#!/bin/bash
set -euo pipefail

echo "Fetch latest version of template-application-nextjs"
git clone --single-branch --branch main --depth 1 git@github.com:navapbc/template-application-nextjs.git

echo "Install template"
./template-application-nextjs/template-only-bin/install-template.sh

echo "Clean up template-application-nextjs folder"
rm -fr template-application-nextjs
