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