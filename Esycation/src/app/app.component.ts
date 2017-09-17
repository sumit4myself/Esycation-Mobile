import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CONFIG } from './base.url';


import {LoginComponent} from '../pages/user/login/login.component';
import {HomeComponent} from '../pages/default/home/home.componet';
import {ViewAllNotificationComponent} from '../pages/notification/view-all/view-all-notification.component';

import {NotificationService} from '../shared/services/common/push.notification.service';
import {CommonServices} from '../shared/services/common/common.service';
import {RoleService} from '../shared/services/userauth/role.service';
import {RoleModel} from '../shared/models/baseModel/role.model';
import {UserPrefernce} from '../shared/models/baseModel/BaseModels';

@Component({
  selector: 'page-root',
  templateUrl: 'app.html'
})

export class AppComponent {

  @ViewChild(Nav) nav: Nav;
  color: string = '#009688';
  rootPage: any = LoginComponent;
  userId:number=null;
  userPrefernce:UserPrefernce;
 // pages: Array<{ title: string, component: any, icon: string; image: boolean, show: boolean }> = [];
 pages: Array<RoleModel>;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private events: Events,
    private notification:NotificationService,
    private commonServices:CommonServices,
    private roleService:RoleService) {
    this.initializeApp();
    
    
    /*
    Array of pages that is used in the apps menu.
    when the event isloggedIn is fired, the pages is modified to show a profile page as well.
     */
    this.events.subscribe('isLoggedIn', () => {


      this.userPrefernce = this.commonServices.currentUser();
      this.userId = this.commonServices.findCurrentUserId();   
    
      this.pages =  this.roleService.findRole(this.userPrefernce.module);

      /*this.pages = [
       { title: 'Profile', component: ProfileComponent, icon: "assets/img/default.png", image: true, show: false },
       { title: 'Home', component: HomeComponent, icon: 'ios-home-outline', image: false, show: false }, 
       { title: 'Add Acount', component: AccountListComponent, icon: 'people-outline', image: false, show: false },
       { title: 'Attendance', component: ManageAttendanceComponent, icon: 'clipboard-outline', image: false, show: false },
       { title: 'Notification', component: ViewAllNotificationComponent, icon: 'chatboxes-outline', image: false, show: false },
       { title: 'Leave', component: LeaveComponent, icon: 'ios-plane-outline', image: false, show: false },
       { title: 'Settings', component: SettingComponent, icon: 'settings-outline', image: false, show: false },
       { title: 'Logout', component: LogoutComponent, icon: 'ios-log-in-outline', image: false, show: false }
      ];*/
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     let isViewALl= this.notification.pushNotificationSetup();
     if(isViewALl==true){
      this.nav.push(ViewAllNotificationComponent);
     }
    });

    /*
      Set the URL and API version to the server where loopback project is hosted
      CONFIG is a constant exported from base.url.ts found in src/app/base.url.ts
    */
    //LoopBackConfig.setBaseURL(CONFIG.BASE_URL);
    //LoopBackConfig.setApiVersion(CONFIG.API_VERSION);
  }

  /*
  open page from menu selection
   */

   
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  /*
    user to set shades for the menu section
   */
  colorLuminance(hex, lum, type?) {

    //console.log("hex :",hex+ "  lum :",lum+" type ",type);
    if (!type) {
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;
      // convert to decimal and change luminosity
      let rgb = '#', c, i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
      }
      return rgb;
    } else {
      let num = parseInt(hex.slice(1), 16), amt = Math.round(2.55 * lum), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
  }

}
