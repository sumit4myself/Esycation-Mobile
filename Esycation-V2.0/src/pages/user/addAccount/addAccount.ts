import { Component } from '@angular/core';
import { IonicPage,ViewController,Nav, LoadingController, Loading,Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'home-page',
  templateUrl: 'addAccount.html',
   
})
export class AddAccountComponent {
  loading: Loading;

  slides = [
    {
      title: "WELCOME",
      description: "This is ionic3FullApp with firebase  introduction / walkthrough page ",
      image: "./assets/slide1.png",
      color: "#673ab7"
    },
    {
      title: "Layout with firebase",
      description: "This is ionic3FullApp with firebase introduction / walkthrough page",
      image: "./assets/slide2.png",
      color: "#007aff"
    },
    {
      title: "Components",
      description: "This is ionic3FullApp with firebase introduction / walkthrough page",
      image: "./assets/slide3.png",
      color: "#ffcc00"
    },
    {
      title: "Theme",
      description: "This is ionic3FullApp with firebase introduction / walkthrough page",
      image: "./assets/slide4.png",
      color: "#ff2d55"
    }
  ];

  constructor(
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private events:Events) 
    {        
      console.log("Home........");
    }


  ionViewDidLoad() {
      
  }
   
}


