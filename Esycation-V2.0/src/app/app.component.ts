import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,ModalController,Events } from 'ionic-angular';

//***********  ionic-native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {PrivilageService} from '../providers/service/core/privilage.service'
import {UserPrefernce} from '../providers/model/common/UserPrefernce';
import {UserSessionService} from '../providers/service/core/user.session.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  //rootPage: string = 'IntroPage';
  rootPage: string = 'LoginComponent';
  menu:Array<any> = [];
  pages: Array<any>;
  userPrefernce:UserPrefernce=UserPrefernce.factory();
  loginUsers:Array<any>;
  userShow:boolean=false;
  icon:string="ios-add-outline"
  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private privilageService:PrivilageService,
              private session:UserSessionService,
              private modal:ModalController,
              private events:Events) {
        this.initializeApp();

        this.userPrefernce = this.session.findUserDetails();
        this.loginUsers = this.session.findUsers();
        this.menu = this.privilageService.privilaged(this.userPrefernce.module);


        this.events.subscribe("LOGIN_USER_EVENT", ()=>{
          this.userPrefernce = this.session.findUserDetails();
          this.loginUsers = this.session.findUsers();
          this.menu = this.privilageService.privilaged(this.userPrefernce.module);

          console.log("LOGIN_USER_EVENT..!",JSON.stringify(this.userPrefernce));
          
        });
        this.pages = [ 
          // { icon:'call', title:'Contact us', component: 'ContactPage' },
          { icon:'ios-log-in-outline', title:'Logout', component: "LogoutComponent" }    
        ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  toggleDetails(menu) {
    if (menu.showDetails) {
        menu.showDetails = false;
        menu.icon = 'ios-add-outline';
    } else {
        menu.showDetails = true;
        menu.icon = 'ios-remove-outline';
    }
  }
  toggleUsers(isShow){

    if(isShow){
      this.userShow=false;
      this.icon = 'ios-add-outline';
    }
    else{
      this.userShow=true;
      this.icon = 'ios-remove-outline';
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // page.component = item array.component --> 
    //this.nav.setRoot(page.component);
    this.nav.setRoot(page.component).catch(err => console.error(err));
  }

 onAddAccount(){
    let modal = this.modal.create("AddAccountComponent");
    modal.onDidDismiss(isaddAccount => {
      if(isaddAccount){
        this.nav.setRoot("AddAccountComponent");
      }
  });
  modal.present();
 }

 onSwitchAccount(userId:number){
  this.session.switchAccount(userId);
  this.events.publish('LOGIN_USER_EVENT');
 }
 onViewProfile(){
  this.nav.setRoot("ViewProfileComponent");
 }

}

