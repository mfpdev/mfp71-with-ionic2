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
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class Login  {
  public items : any;
  private challenge : any;
  private username : string;
  private password : string;

  constructor(public navCtrl: NavController, params: NavParams) {
      this.challenge = params.get("challenge");
  }

  login () {
    var reqURL = '/j_security_check';
    var options = {
        parameters :{},
        options  : {},
        headers : {}
    };
    options.parameters = {
        j_username : this.username,
        j_password : this.password
    };
    options.headers = {};

    var loginObject = this;
    
    this.challenge.submitLoginForm(reqURL, options, 
        function (response) {
            if (response.responseText.search('j_security_check') >= 0){
                alert ("Wrong credentials");
                loginObject.challenge.handleChallenge(response);
            } else {
                loginObject.challenge.submitSuccess();
                loginObject.navCtrl.pop();
            }
        });
    }
}