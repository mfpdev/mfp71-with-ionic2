# Running MobileFirst Platform Foundation 7.1 Cordova app with Ionic2

This sample will show you how to add Ionic2 to an MFP 7.1 Cordova app.  The app in this sample calls a MobileFirst Blog RSS adapter protected with a login form.  

##Demo
[![MFP 7.1 + Ionic2](https://img.youtube.com/vi/dzQqyDVcehQ/0.jpg)](https://www.youtube.com/watch?v=dzQqyDVcehQ)

## Prerequisites
* [Installed Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Installed NodeJS / npm](https://docs.npmjs.com/getting-started/installing-node)
* [Installed MobileFirst Platform Foundation 7.1 Server](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/7.1/advanced-client-side-development/using-cli-to-create-build-and-manage-mobilefirst-project-artifacts/)

## Running the sample

- Clone this repository   

 ```bash
 $ git clone https://github.com/mfpdev/mfp71-with-ionic2.git
 ```

- Add the `SecurityTest` to `authenticationConfig.xml`

    - Add the customSecurityTest `AuthSecurityTest`:
    ```xml
    <!-- Add it under securityTests node -->
    <customSecurityTest name="AuthSecurityTest">
      <test isInternalUserID="true" realm="SampleAppRealm"/>
    </customSecurityTest>
    ```

- Deploy the MFRSSAdapter

  - Copy the [MFRSSAdapter](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MFRSSAdapter) folder to the `adapters` folder on your MFP 7.1 server.

  - Build and deploy the adapter:
    - From the terminal window, navigate into the adapter folder and run the following:
    ```bash
    $ mfp push
    ```

- Install and run the Sample app
  - From the terminal window, navigate into [MyApp](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp) and run:
  ```bash
  $ npm install
  ```

  - [Transpile](https://www.wikiwand.com/en/Source-to-source_compiler) the TypeScript code in the [app](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp/app) folder with [gulp](http://gulpjs.com/) commands:

    - Run `build` to transpile the [TypeScript](https://www.typescriptlang.org/) code once
    ```bash
    $ gulp build
    ```
    - Or run `watch` to let `gulp` transpile the TypeScript code on every time you change something in the [app](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp/app) folder.
    ```bash
    $ gulp watch
    ```

  - Add your platform (ios/android):
    ```bash
    $ mfp cordova platform add ios
    ```

  - Add the cordova-plugin-mfp plugin  
    ```bash
    $ mfp cordova plugin add cordova-plugin-mfp
    ```

  - Deploy the application
    ```bash
    $ mfp cordova push
    ```
  - Run the application
    ```bash
    $ mfp cordova emulate
    ```

  ## How to create a blank template of an MFP 7.1 Cordova app that uses Ionic2
  The main challenges are:

  - Ionic2 uses a later version of Cordova than MFP 7.1 (Cordova 3.7.0) - to deal with this you need to create Ionic2 project without Cordova and then merge it into an MFP 7.1 Cordova app.
  - Ionic2 currently works with TypeScript and MFP 7.1 is not built to call from TypeScript - to deal with this you need to add the .d.ts files into the typings folder and use `gulp` commands

  ### Guidelines:

  - Create the MFP 7.1 Cordova app by running the following commands in a terminal window:
  ```bash
  $ mfp cordova create myapp -p ios,android
  $ cd myapp
  $ npm install
  ```

  - Create an empty Ionic2 app by running the following commands in a terminal window:
  ```bash
  $ ionic start -v2 --no-cordova ioniccode blank
  ```

  - Copy Ionic2 Into an MFP 7.1 Cordova app by running the following command in a terminal window:
  ```bash
  $ cp -a ./ioniccode/. ./myapp/
  ```

  - Add wlInit.js into `./myapp/www/js/` by running the follow command in a terminal window:
  ```bash
  $ curl -o ./myapp/www/js/wlInit.js https://raw.githubusercontent.com/mfpdev/mfp71-with-ionic2/master/MyApp/www/js/wlInit.js
  ```

  - Add the reference to wlInit.js in ./myapp/www/index.html
  ```html
  <script src="js/wlInit.js"></script>
  ```

  - Add the .d.ts files by running the follow command in a terminal window:
  ```bash
  $ curl -o ./myapp/typings/jquery/jquery.d.ts https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/jquery/jquery.d.ts --create-dirs
  $ curl -o ./myapp/typings/ibm-mobilefirst/ibm-mobilefirst.d.ts https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/ibm-mobilefirst/ibm-mobilefirst.d.ts --create-dirs
  ```

  - Add reference to ibm-mobilefirst.d.ts in `./myapp/index.d.ts`
  /// <reference path="ibm-mobilefirst/ibm-mobilefirst.d.ts" />

  - Run `npm install`

  - Run `gulp build` or `gulp watch`

  - Preview / Run the app by running one of the commands in a terminal window:

  ```bash
  mfp cordova emulate
  ```

  ```bash
  mfp cordova preview
  ```

  *Caution: Always run Cordova commands using the mfp CLI (e.g mfp cordova emulate). Running Cordova directly will cause the app to stop working since MFP 7.1 does not work with Cordova version beyond 3.7*

  ### Supported Levels
  IBM MobileFirst Platform Foundation 7.1

  ### License
  Copyright 2016 IBM Corp.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
