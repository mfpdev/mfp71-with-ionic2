import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/entry/entry.html'
})
export class Entry  {
  entry : any
  
  constructor(public navCtrl: NavController, params: NavParams) {
      this.entry = params.get("entry");
  }
}