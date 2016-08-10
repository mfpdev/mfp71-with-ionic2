# Running MobileFirst Platform Foundation 7.1 Cordova App With Ionic V2 (Beta)

This sample will show you how to add Ionic V2 to MFP 7.1 App.  The sample allow calling a MobileFirst Blog RSS adapter which protected with login form.

## Prerequisites
* [Installed Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Installed NodeJS / npm](https://docs.npmjs.com/getting-started/installing-node)
* [Installed MobileFirst Platform Foundation 7.1 Server](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/7.1/advanced-client-side-development/using-cli-to-create-build-and-manage-mobilefirst-project-artifacts/)

<<<<<<< HEAD
---   
=======
mfp cordova platform add ios (or android)
>>>>>>> f7f5817f2bfb7768e8a697072033ed63ed19d568

## Running the sample

 - Clone this repository
 ```bash
 git clone https://github.com/mfpdev/mfp71-with-ionic2.git
 ```

- Add the `SecurityTest` to `authenticationConfig.xml`

<<<<<<< HEAD
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
    mfp push
    ```

- Install and run the Sample App
  - From terminal navigate into [MyApp](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp) and run:
  ```bash
  npm install
  ```

  - Transpile the TypeScript code in [app](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp/app) folder:

    - Run `build` for just compile the TypeScript one time
    ```bash
    gulp build
    ```
    - Or run `watch` to let gulp transpile it on every change you do in the [app](https://github.com/mfpdev/mfp71-with-ionic2/tree/master/MyApp/app) folder.
    ```bash
    gulp watch
    ```
  - Add your platform (ios/android):
    ```bash
    mfp cordova platform add ios
    ```

  - Add the cordova-plugin-mfp plugin  
    ```bash
    mfp cordova plugin add cordova-plugin-mfp
    ```

  - Deploy the application
  ```bash
  mfp cordova push
  ```
=======
---


ionic -v2 start --no-cordova ioniccode blank

mfp cordova create myapp -p ios,android

Merge files

Add wlInit.js

Add d.ts files:
  https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/ibm-mobilefirst/ibm-mobilefirst.d.ts
  https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/jquery/jquery.d.ts
>>>>>>> f7f5817f2bfb7768e8a697072033ed63ed19d568
