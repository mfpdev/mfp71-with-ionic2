import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Entry} from '../entry/entry';

@Component({
  templateUrl: 'build/pages/feed/feed.html'
})
export class Feed {
  public items : any;

  constructor(public navCtrl: NavController, params: NavParams) {
      this.items = params.get("items");
  }

  showEntry(item) {
    this.navCtrl.push(Entry, {
          entry: item
    });
  }
}
