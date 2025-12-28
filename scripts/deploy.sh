#!/usr/bin/env bash
set -euo pipefail
pnpm build 
mv ./build/* ./dist 
rm -rf ./build 
cd ./dist 
git add . 
git commit -m "chore: deploy" 
git push origin dist
