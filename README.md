# Running MobileFirst Platform Foundation 7.1 Cordova App and Ionic V2

This sample will show you how to add Ionic V2 to MFP 7.1 App.  The sample allow calling a MobileFirst Blog RSS adapter which protected with login form.  

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

    - Add the realm `SampleAppRealm`
    ```xml
    <!-- Add it under realms node -->
		<realm name="SampleAppRealm" loginModule="StrongDummy">
			<className>com.worklight.core.auth.ext.FormBasedAuthenticator</className>
		</realm>
    ```

    - Add the `loginModule`
    ```xml
    <!-- Add it under loginModules node -->
    <loginModule name="StrongDummy" expirationInSeconds="3600">
        <className>com.worklight.core.auth.ext.NonValidatingLoginModule</className>
    </loginModule>
    ```

- Deploy the MFRSSAdapter

  - Copy the [MFRSSAdapter](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MFRSSAdapter) folder to `adapters` folder in your MFP 7.1 server

  - Build and deploy the adapter:
    - From terminal navigate into the adapter folder and run:
    ```bash
    $ mfp push
    ```

- Install and run the Sample App
  - From terminal navigate into [MyApp](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp) and run:
  ```bash
  $ npm install
  ```

  - Transpile the TypeScript code in [app](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp/app) folder:

    - Run `build` for just compile the TypeScript one time
    ```bash
    $ gulp build
    ```
    - Or run `watch` to let gulp transpile it on every change you do in the [app](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp/app) folder.
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

  ## Create the above template from scratch
  In this section I will explain how to create blank template of MFP 7.1 and Ionic2 like the above sample. There are some challenges here:

  - MFP 7.1 Cordova App is come with Cordova 3.7.0 - to solve this you need to create Ionic2 project without Cordova and then merge it into MFP 7.1 Cordova App
  - The Ionic V2 works for now with TypeScript - to solve this you need to add the d.ts files and use the gulp commands

  - Create the MFP 7.1 Cordova App by running the following commands in terminal:
  ```bash
  $ mfp cordova create myapp -p ios,android
  $ cd myapp
  $ npm install
  ```

  - Create empty Ionic2 App by running the following commands in terminal:
  ```bash
  $ ionic start -v2 --no-cordova ioniccode blank
  ```

  - Copy Ionic2 Into MFP 7.1 Cordova App by running the following command in terminal:
  ```bash
  $ cp -a ./ioniccode/. ./myapp/
  ```

  - Add wlInit.js into `./myapp/www/js/` by running the follow command in terminal:
  ```bash
  $ curl -o ./myapp/www/js/wlInit.js https://raw.githubusercontent.com/mfpdev/mfp71-with-ionic2/master/MyApp/www/js/wlInit.js
  ```

  - Add the reference to wlInit.js in ./myapp/www/index.html
  ```html
  <script src="js/wlInit.js"></script>
  ```

  - Add the d.ts files by running the follow command in terminal:
  ```bash
  $ curl -o ./myapp/typings/jquery/jquery.d.ts https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/jquery/jquery.d.ts --create-dirs
  $ curl -o ./myapp/typings/ibm-mobilefirst/ibm-mobilefirst.d.ts https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/ibm-mobilefirst/ibm-mobilefirst.d.ts --create-dirs
  ```

  - Add reference to ibm-mobilefirst.d.ts in `./myapp/index.d.ts`
  /// <reference path="ibm-mobilefirst/ibm-mobilefirst.d.ts" />

  - Run `npm install`

  - Run `gulp build` or `gulp watch`

  - Preview/Run the app by running one of the commands:

  ```bash
  mfp cordova emulate
  ```

  ```bash
  mfp cordova preview
  ```


  ### Supported Levels
  IBM MobileFirst Platform Foundation 8.0

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
