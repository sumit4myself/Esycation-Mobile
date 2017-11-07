import { Component,ViewChild } from '@angular/core';
import { IonicPage,Nav, Loading, } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'home-page',
  templateUrl: 'manageAccount.html',
   
})
export class ManageAccountComponent {
  @ViewChild(Nav) nav: Nav;
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

  constructor() 
    {        
      console.log("Home........");
    }


  ionViewDidLoad() {
      
  }
   
}


