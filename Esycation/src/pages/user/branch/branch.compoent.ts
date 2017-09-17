import { Component } from '@angular/core';
import { NavController,Events} from 'ionic-angular';
import {ViewController,ModalController} from 'ionic-angular';

@Component({
  selector: 'branch-page',
  template: '<ion-content>'+
  +' <ion-searchbar ></ion-searchbar>'+
  '<ion-content>'
})
export class BranchComponent {

 constructor(
    private navCtrl: NavController,
    private events:Events,
    private modalControl:ModalController) {


    }
 
}
