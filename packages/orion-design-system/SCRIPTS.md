
### Available NPM Scripts
These are the npm scripts that you'd likely use.

**Note**: if you are running on node 18, you will run into an `error:0308010C:digital envelope routines::unsupported` error. This is because of webpack which is a dependency of Storybook. To get around this, set the following environment variable: `export NODE_OPTIONS=--openssl-legacy-provider`. After the environment variable is set, rerun the npm script. Additional information on this issue can be found [here](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)

#### start
```
npm run webfont && concurrently "npm run scss-watch" "stencil build --dev --watch --serve"
```
Build the ORION icon font, watch for code changes, serve locally

#### test
```
stencil test --spec --e2e
```
Run end-to-end tests

#### build
```
stencil build --docs
```
Generate readme.md docs based on the component types, properties, methods, events, JSDocs, CSS Custom Properties, etc.

#### test.watch
```
stencil test --spec --e2e --watchAll
```
Run Stencil tests and watch for changes

#### generate
```
stencil generate
```
Start the interactive component generator

#### clean-all
```
npm run clean-stencil && npm run clean-storybook
```
Delete the contents of `dist/`, `loader/`, and `storybook-static/`

#### clean-stencil
```
rimraf dist/ loader/
```
Delete the contents of `dist/` and `loader/`
#### clean-storybook
```
rimraf storybook-static/
```
Delete the contents of `storybook-static/`
#### storybook-no-legacy
```
npm run clean-all && npm run build && start-storybook -p 6006 --quiet
```
Delete the contents of `dist/`, `loader/`, and `storybook-static/`; start Storybook locally

#### storybook
```
npm run clean-all && npm run build && export SET NODE_OPTIONS=--openssl-legacy-provider && start-storybook -p 6006 --quiet
```
Delete the contents of `dist/`, `loader/`, and `storybook-static/`; start Storybook locally with a legacy-provider tag for GitHub action compatibility

#### dev-storybook-no-legacy
```
npm run clean-all && concurrently -n stencil,storybook "stencil build --watch" "npm:storybook" "npm run scss-watch"
```
Delete the contents of `dist/`, `loader/`, and `storybook-static/`; run Stencil in watch mode, run Storybook in watch mode

#### dev-storybook
```
npm run clean-all && concurrently -n stencil,storybook "stencil build --watch" "npm:storybook" "npm run scss-watch"
```
Delete the contents of `dist/`, `loader/`, and `storybook-static/`; run Stencil in watch mode, run Storybook in watch mode with a legacy-provider tag for GitHub action compatibility

#### build-storybook-no-legacy
```
npm run clean-all && npm run build && build-storybook
```
Delete the contents of `dist/`, `loader/`, and `storybook-static/`; start the interactive component generator, build Storybook for production

#### build-storybook
```
npm run clean-all && npm run build && export SET NODE_OPTIONS=--openssl-legacy-provider && build-storybook
```
Delete the contents of `dist/`, `loader/`, and `storybook-static/`; start the interactive component generator, build Storybook for production with a legacy-provider tag for GitHub action compatibility
#### lint-js
```
eslint ./src
```
Lint source js (and js adjacent) files

#### lint-fix-js
```
eslint ./src --fix
```
Lint source js (and js adjacent) files, fix any addressable issues

#### lint-css
```
prettier --check "src/**/*.{css,scss}"
```
Lint source css/scss files

#### lint-fix-css
```
prettier --write "src/**/*.{css,scss}"
```
Lint source css/scss files, fix any addressable issues

#### lint
```
npm run lint-js && npm run lint-css
```
Lint source js and css files
#### lint-fix
```
npm run lint-fix-css && npm run lint-fix-js
```
Lint and address issues in source js and css files

#### release-build
```
npm run webfont && concurrently "npm run scss-compile" "npm run build"
```
Build the ORION icon font, compile css from scss partials, build the production-ready Stencil library

#### release-publish
```
npm publish --registry https://artifactorycloud.ual.com/artifactory/api/npm/l-npm/
```
Publish the ORION Component Library npm package to Artifactory

#### release
```
npm run release-build && npm run release-publish
```
Build the ORION Component Library npm package, publish to Artifactory

#### scss-compile
```
sass src/components:src/components
```
Compile css from scss partials

#### scss-watch
```
sass --watch src/components:src/components
```
Watch scss files for changes

#### webfont-clean-svgs
```
svgo -f ./assets/16px -o ./src/assets/icons/sm --config svgoconfig.js && svgo -f ./assets/24px -o ./src/assets/icons/md --config svgoconfig.js
```
Clean and normalizes SVG icons

#### webfont-rename
```
renamer --chain renamer-case --case lower src/assets/icons/*/* --force && renamer --find "/(\d)\ /g" --replace "$1"  src/assets/icons/*/* --force 
&& renamer --find "/\ /g" --replace "_" src/assets/icons/*/* --force
```
Update names in the ORION icon font to the correct case
#### webfont-generate
```
fantasticon --config .fantasticonrcSM.js && fantasticon --config .fantasticonrcMD.js
```
Generate the ORION icon library via fantasticon

#### webfont
```
npm run webfont-clean-svgs && npm run webfont-rename && npm run webfont-generate
```
Clean and normalizes SVG icons, update names in the ORION icon font to the correct case, and generate the ORION icon library via fantasticon

#### prettier-check-js
```
prettier --check "src/**/*.{js, tsx}"
```
Check js/ts files for formatting issues

#### prettier-fix-js
```
prettier --write "src/**/*.{js, tsx}"
```
Fix formatting issues in js/ts files

#### husky-prettier-fix
```
cd ../.. && npm run husky-eslint-fix
```
Navigate to the project root and fire off the command to run Prettier via Husky

#### deploy
```
cd ../../ && bash release.sh
```
Navigate to the project root and run the release script
