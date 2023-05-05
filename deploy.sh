#!/usr/bin/env bash
set -e

pnpm tsx scripts/convert-zh-tw.ts
pnpm lint --fix
pnpm build
rsync -r -og --chown=http:http dist/. hk:/var/www/eh5.me/
