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
    var request = new WLResourceRequest('/adapters/SimpleAdapter/getFeed', "GET");
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
