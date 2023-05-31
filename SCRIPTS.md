
### Available NPM Scripts
These are the npm scripts that you'd likely use.

**Note**: if you are running on node 18, you will run into an `error:0308010C:digital envelope routines::unsupported` error. This is because of webpack which is a dependency of Storybook. To get around this, set the following environment variable: `export NODE_OPTIONS=--openssl-legacy-provider`. After the environment variable is set, rerun the npm script. Additional information on this issue can be found [here](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)

#### test
```
echo tests
```
Print "tests"

#### deleteCopies
```
"rm -rf **/*/package.jsonpackage.copyfile",
```
Delete temp files created in `release.sh`

#### release-react
```
"cd packages/orion-design-system-react && npm run release",
```
Navigate to the React directory, build React library, and release to Artifactory

#### release-vue
```
"cd packages/orion-design-system-vue && npm run release",
```
Navigate to the Vue directory, build Vue library, and release to Artifactory

#### release-stencil
```
"cd packages/orion-design-system && npm run release",
```
Navigate to the Stencil directory, build Stencil library, and release to Artifactory

#### release
```
"bash release.sh",
```
Run the release bash script


#### build-storybook
```
"cd packages/orion-design-system && npm run build-storybook",
```
Navigate to the Stencil directory and build Storybook

#### install-stencil
```
"cd packages/orion-design-system && npm install",
```
Navigate to the Stencil directory and install packages

#### lint-stencil
```
"cd packages/orion-design-system && npm run lint",
```
Navigate to the Stencil directory and lint files

#### build-stencil
```
"cd packages/orion-design-system && npm run build",
```
Navigate to the Stencil directory and build Stencil components

#### husky-prettier
```
"prettier --write './packages/orion-design-system/src/components/**/*.{js, tsx}'",
```
Run Prettier on source js/ts files (created specifically for Husky compatibility)

#### husky-eslint-check
```
"eslint './packages/orion-design-system/src/components/**/*.js'",
```
Lint source js files (created specifically for Husky compatibility)

#### husky-eslint-fix
```
"eslint --fix './packages/orion-design-system/src/components/**/*.js'"
```
Lint source js files and fix any addressable issues (created specifically for Husky compatibility)

#### deploy
```
"bash release.sh"
```
Runs the ORION release script

