/**
 *    © Copyright 2016 IBM Corp.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Feed} from '../feed/feed';
import {Login} from '../login/login';
 

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  nav : NavController;
  sampleAppRealmChallengeHandler : any;

  constructor(private navCtrl: NavController) {

  }

  
  getMFBlogFeed() {  
    this.registerAndHandleChallenge ();
    var nav = this.navCtrl;
    var request = new WLResourceRequest('/adapters/MFRSSAdapter/getFeed', "GET");
    request.send().then(
      function (response) {
        nav.push(Feed, {
          items: response.responseJSON.rss.channel.item
        });
      },

      function (error) {
        alert ("error");
      }
    );
  }
  
  registerAndHandleChallenge () {
    this.sampleAppRealmChallengeHandler = WL.Client.createChallengeHandler("SampleAppRealm");
    
    this.sampleAppRealmChallengeHandler.isCustomResponse = function(response: any) {
      if (!response || response.responseText === null) {
          return false;
      } else {
          return response.responseText.search('j_security_check') >= 0;
      }
    };

    var nav = this.navCtrl;
    var challenge = this.sampleAppRealmChallengeHandler;
    this.sampleAppRealmChallengeHandler.handleChallenge = function name(response:any) {
        nav.push(Login, {
          challenge: challenge  
        });
    }
  }
}
