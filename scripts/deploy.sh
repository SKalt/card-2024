#!/usr/bin/env bash
set -euo pipefail
pnpm build
rm -rf ./dist/* 
mv ./build/* ./dist 
rm -rf ./build 
cd ./dist 
git add . 
git commit -m "chore: deploy" 
git push origin dist
