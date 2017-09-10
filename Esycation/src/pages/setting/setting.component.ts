import { Component } from '@angular/core';
import { NavController,Events} from 'ionic-angular';
import {InternalStorage} from '../../shared/storage/storage.swaps';
@Component({
  selector: 'setting-page',
  templateUrl: 'setting.html'
})
export class SettingComponent {

 message:string;
 deviceId:string; 
 constructor(
    public navCtrl: NavController,
    public events:Events,
    private storage:InternalStorage) {
      this.deviceId = storage.get("registerId");
      this.message = storage.get("notification");

    }
 
}
