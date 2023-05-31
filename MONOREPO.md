# Monorepo Setup

## Overview
Orion Design System utilizes a monorepo structure to manage multiple libraries in one setting. This is important because our primary development library (/packages/orion-design-system) needs to act as a source library that can then export a version of itself wrapped properly for React (/packages/orion-design-system-react).

## Lerna
[Lerna](https://lerna.js.org/) is a monorepo management tool. We use it primarily to handle multiple child library dependencies and configure symlinking. This is particularly useful if you'd like to add a test application to see changes to live development. 

### Adding a new library/application
1. Add your new application to the monorepo structure
```
orion-design-system
 - packages
   - [new-library]
   - [new-application]
```
2. Bootstrap project using Lerna
```
cd /path/to/orion-design-system-root-folder
lerna bootstrap
```

## Extending Stencil
Orion uses the development framework Stencil to manage the core Web Component library. In addition to outputing the core Web Component library, Stencil can be extended to create wrapped versions the Web Components for use in other popular JS frameworks by using their `outputTarget` pluggins. More information on this can be found in the [Stencil docs](https://stenciljs.com/docs/output-targets)

## Husky
The Orion Design System repo uses Husky to run linting on commits, preventing flawed code from being added. Important for our purposes is that Husky has been configured to only run in `/packages/orion-design-system`. To change this setup, refer to `/.husky/pre-commit`