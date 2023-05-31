![image](https://user-images.githubusercontent.com/112984366/214142655-77e2d4fe-6b62-427f-9ca3-54aee792eb2a.png)

# ORION Design System Web Component Library

ORION is United's employee experience design system developed to create cohesive, consistent experiences across digital employee applications. Additional information regarding the ORION Design System can be found on the documentation site at [https://orion.united.com/](https://orion.united.com/).

This repository contains the source code for ORION's web component library.

## Table of Contents

- [Developer Setup](#developer_setup)
  - [Configure local environment](#configure_local_environment_application)
  - [Using Angular](#using_angular)
    - [Example setup](#example_setup_angular)
  - [Using React](#using_react)
    - [Example setup](#example_setup_react)
- [Browser Support](#browser_support)
- [Tips and Troubleshooting](#tips_and_troubleshooting)

<div id="developer_setup"></div>

## Developer Setup

These instructions detail how to import the ORION Design System into your application.

<div id="configure_local_environment_application"></div>

### Configure local environment

1. Ensure that you are connected to the United VPN

2. Check to see that you are using node `v14.0.0` and above. We suggest using `v16.17.0`.

3. If you have not done so yet, configure `npm` to use `Artifactory`:

    1. Log in to Artifactory Cloud and generate token:
        1. Go to `https://artifactorycloud.ual.com/ui/`
        2. Click "SAML SSO"
        3. Click on "Welcome, uID" dropdown and select "Set Me Up" 
        4. <img width="290" alt="Screen Shot 2023-04-27 at 12 19 48 PM" src="https://user-images.githubusercontent.com/112984366/234940321-ba205f1a-3488-41b9-833b-782846e1ede4.png">
        5. Select "npm"
        6. Change repository to "l-npm"
        7. Click on "Generate Token & Create Instructions"
        8. Close browser window
    <br /> 
    
    2. In a `bash` or `zsh` terminal, config npm to use @orion scope
    
    ```
    npm config set @orion:registry https://artifactorycloud.ual.com/artifactory/api/npm/l-npm/
    ```
    <br />
        
    3. Add log in information to npm for @orion scope
    
    ```
    npm login --scope=@orion --registry=https://artifactorycloud.ual.com/artifactory/api/npm/l-npm/
    ```
    _(Once you run this command, a browser window will open and automatically log in to Artifactory. If a browser window does not open, copy the URL and paste it into a browser. You will see a success message in the browser. Then you can close the browser window.)_
    <br />
    <br />
    
    4. Base64 encode your United SSO password (replace everything within the quotes with your password) and save
    
    ```
    echo -n '<PASSWORD>' | base64
    ```
    <br />
    
    5. Open your `.npmrc` file
       
       (Windows users: this file is located at `C:\Users\%Username%` and can be edited with notepad)
       
    ```
    open ~/.npmrc
    ```
    <br />
    
    6. Add the following content to the bottom of the file, replacing the &lt;PLACEHOLDERS&gt; with your actual info. Save and close.
    <pre>
    @orion:registry=https://artifactorycloud.ual.com/artifactory/api/npm/l-npm/
    //artifactorycloud.ual.com/artifactory/api/npm/l-npm/:_password=&lt;BASE64_PASSWORD&gt;
    //artifactorycloud.ual.com/artifactory/api/npm/l-npm/:username=&lt;YOUR_UID&gt;@global.ual.com
    //artifactorycloud.ual.com/artifactory/api/npm/l-npm/:email=&lt;YOUR_EMAIL_USERNAME&gt;@united.com
    //artifactorycloud.ual.com/artifactory/api/npm/v-npm/:always-auth=true
    </pre>
    <br />
    
    7. Explicitly set unscoped packages to use the standard npm registry
    
    ```
    npm config set registry=https://registry.npmjs.org
    ```


<div id="using_angular"></div>

### Using Angular

1. Install the `orion-design-system` package from Artifactory:

```
npm install @orion/orion-design-system
```

2. Import `@orion/orion-design-system/loader` into the application entry file:

```
// main.ts

import { applyPolyfills, defineCustomElements } from '@orion/orion-design-system/loader'

//...

applyPolyfills().then(() => {
  defineCustomElements(window);
})

```

3. Update `app.module.ts` to include the `CUSTOM_ELEMENTS_SCHEMA`

```
// app.module.ts

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  //...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

4. Update root-level `styles.css` or `styles.scss` file to import the ORION icon font-face

```
@import url('../node_modules/@orion/orion-design-system/dist/orion-web-components/orion-web-components.css');
```

5. Use `kebab-case` naming to include your ORION components

```
<orion-component-name
  // ... props
></orion-component-name>
```

<div id="example_setup_angular"></div>

#### Example setup

```
// File: app.component.ts

import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  handler (event: Event) {
    console.log('value changed', event)
  }
  value = 5
}
```

```
<!-- File: app.component.html -->

<orion-stepper
  (valueChanged)="handler($event)"
  [value]="value"
  min="3"
  max="7"
></orion-stepper>
<orion-accordion>
  <span slot="orion-accordion-header">
    Lorem Ipsum
  </span>
  <div slot="orion-accordion-panel">
    <app-test-component></app-test-component>
  </div>
</orion-accordion>
```

```
// File: test-component.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent {
  clickHandler () {
    console.log('Test component click')
  }
}
```

```
<!-- test-component.component.html -->
<orion-button (click)="clickHandler()">
  test-component button
</orion-button>
```

<div id="using_react"></div>

### Using React

1. Install the `orion-design-system` package from Artifactory:

```
npm install @orion/orion-design-system
```

2. Install the `orion-design-system-react` package from Artifactory:

```
npm install @orion/orion-design-system-react
```

3. Import `@orion/orion-design-system/loader` into the application entry file:

```
// index.js

import { applyPolyfills, defineCustomElements } from '@orion/orion-design-system/loader'

//...

applyPolyfills().then(() => {
  defineCustomElements(window);
})
```

4. Update root-level `index.css` or `App.css` file to import the ORION icon font-face 
(or any other high-level css/scss file)

```
@import url('../node_modules/@orion/orion-design-system/dist/orion-web-components/orion-web-components.css');
```

5. Import ORION components from `orion-design-system-react` library using `PascalCase`

```
// your-component-file

import {OrionComponent} from '@orion/orion-design-system-react'
```

6. Use imported component as expected

```
<OrionComponent
  // ... props
></OrionComponent>
```

<div id="example_setup_react"></div>

#### Example setup

```
// App.js
import './App.css';

import {OrionStepper, OrionAccordion, OrionButton} from '@orion/orion-design-system-react'
import { useState } from 'react'

function TestComponent () {
  return <OrionButton variant='primary' onClick={() => console.log('Test component click')}>
    test-component button
  </OrionButton>
}

function App() {
  const [value] = useState(5)

  return (
    <div className="orion-container">
      <div className="orion-row">
        <div className="orion-col">
          <OrionStepper
            value={value}
            min={3}
            max={7}
            onValueChanged={(event) => console.log('value changed', event)}
          ></OrionStepper>

          <OrionAccordion>
            <span slot="orion-accordion-header">
              Title
            </span>
            <div slot="orion-accordion-panel">
              <TestComponent />
            </div>
          </OrionAccordion>
        </div>
      </div>
    </div>
  );
}

export default App;
```

<div id="browser_support"></div>

## Browser Support

Visual accuracy has been tested for desktop on **Edge, Chrome, Safari and Firefox** and for mobile on **iPhone/Android** devices.

> Current as of 03/14/2023

| Browser            | Supported Version (modern - 2) |
| ------------------ | ------------------------------ |
| Chrome             | 111                            |
| Edge               | 108                            |
| Safari             | 14                             |
| Firefox            | 110                            |
| Safari iOS         | 14                             |
| Chrome for Android | 108                            |

**Responsiveness** has also been tested using in-browser tools and iPhone/Android devices.

<div id="tips_and_troubleshooting"></div>

## Tips and Troubleshooting

- You can utilize the `@latest` tag to install the most recent version of ORION

```
npm install @orion/orion-design-system@latest
```

- Similarly, you can specifiy an exact library version as well

```
npm install @orion/orion-design-system@2.0.0
```

- When using the React ORION library, be sure to match library versions

```
// Bad
npm install @orion/orion-design-system@2.0.0
npm install @orion/orion-design-system-react@2.1.6

// Good
npm install @orion/orion-design-system@2.0.0
npm install @orion/orion-design-system-react@2.0.0
```

- If you're having installation/importing issues, check to see that you are using a supported version on `node` and try setting your node version to our suggested `16.17.0`
