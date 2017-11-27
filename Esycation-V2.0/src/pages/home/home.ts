import { Component,ViewChild } from '@angular/core';
import { IonicPage,Nav, Loading,NavController} from 'ionic-angular';

import {UserSessionService} from '../../providers/service/core/user.session.service';
import {BaseComponent} from '../baseComponent/base.component';

@IonicPage()
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomeComponent extends BaseComponent{
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

  constructor( protected session:UserSessionService,
              protected navController:NavController) { 
      super(session,navController);
      console.log("Home==",this.session.findModule());
  }
 
   
}


