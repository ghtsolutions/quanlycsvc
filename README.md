git branch gh-pages
git checkout gh-pages
git push origin gh-pages
npx ng add angular-cli-ghpages
npx ng deploy --base-href=https://chikiet.com/
npx ng build --prod --base-href https://ghtsolutions.github.io/chikiet88/
"baseHref": "https://ghtsolutions.github.io/chikiet88/",
npx ng add angular-cli-ghpages --project site
npx ngh --dir=dist/apps/site  --no-silent