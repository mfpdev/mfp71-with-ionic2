# Running MobileFirst Platform Foundation 7.1 Cordova App With Ionic V2 (Beta)

This sample will show you how to add Ionic V2 to MFP 7.1 App.  The sample allow calling a MobileFirst Blog RSS adapter which protected with login form.  

## Prerequisites
* [Installed Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Installed NodeJS / npm](https://docs.npmjs.com/getting-started/installing-node)
* [Installed MobileFirst Platform Foundation 7.1 Server](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/7.1/advanced-client-side-development/using-cli-to-create-build-and-manage-mobilefirst-project-artifacts/)

## Running the sample

 - Clone this repository   
 
 ```bash
 git clone https://github.com/mfpdev/mfp71-with-ionic2.git
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

  ## Create the above template from scratch


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
