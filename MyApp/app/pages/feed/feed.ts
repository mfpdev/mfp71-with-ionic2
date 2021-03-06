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
