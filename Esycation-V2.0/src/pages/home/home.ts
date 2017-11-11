import { Component,ViewChild } from '@angular/core';
import { IonicPage,Nav, Loading} from 'ionic-angular';

import {UserSessionService} from '../../providers/service/core/user.session.service';

@IonicPage()
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomeComponent {
  @ViewChild(Nav) nav: Nav;
  loading: Loading;
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
     private session:UserSessionService) 
    { 
      console.log("Home==",this.session.findModule());

        
    }
 
   
}


