import { Component,ViewChild } from '@angular/core';
import { IonicPage,ViewController,Nav, LoadingController, Loading,Events } from 'ionic-angular';
import  {UserSessionService} from '../../providers/service/core/user.session.service';
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
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private events:Events,
    private session:UserSessionService) 
    { 
       this.events.publish('LOGIN_USER_EVENT');     
    }


  ionViewDidLoad() {
   
  }
   
}


