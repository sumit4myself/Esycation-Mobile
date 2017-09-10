import { Component } from '@angular/core';
import { NavController,Events} from 'ionic-angular';
import {ViewController,ModalController} from 'ionic-angular';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomeComponent {

 constructor(
    public navCtrl: NavController,
    public events:Events) {}
 
}
