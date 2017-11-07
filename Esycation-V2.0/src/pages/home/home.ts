import { Component,ViewChild } from '@angular/core';
import { IonicPage,Nav, Loading,Events } from 'ionic-angular';

import {UserPrefernce} from '../../providers/model/common/UserPrefernce';
@IonicPage()
@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
   
})
export class HomeComponent {
  @ViewChild(Nav) nav: Nav;
  loading: Loading;
  userPrefernce:UserPrefernce;
  
  slides = [
    {
      title: "WELCOME",
      description: "To Educore Systems ",
      image: "./assets/img/1.jpg",
      //color: "#673ab7"
    },
    {
      title: "WELCOME",
      description: "To Educore Systems ",
      image: "./assets/1.jpg",
      color: "#007aff"
    }
  ];

  constructor(
    
    private events:Events,
    ) 
    { 
       this.events.publish('LOGIN_USER_EVENT');     
    }


  ionViewDidLoad() {
   
  }
   
}


