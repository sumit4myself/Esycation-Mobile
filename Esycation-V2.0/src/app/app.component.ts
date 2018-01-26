import { Component, ViewChild } from "@angular/core";
import {
  Nav,
  Platform,
  ModalController,
  Events,
  AlertController,
  ToastController
} from "ionic-angular";

//***********  ionic-native **************/
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { PrivilageService } from "../providers/service/core/privilage.service";
import { UserPrefernce } from "../providers/model/common/UserPrefernce";
import { UserSessionService } from "../providers/service/core/user.session.service";
// import { Push } from "@ionic-native/push";
import { CommonServices } from "../providers/service/common/common.service";
import { DeviceService } from "../providers/service/notification/device.service";
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //rootPage: string = 'IntroPage';
  rootPage: string = "LoginComponent";
  menu: Array<any> = [];
  pages: Array<any>;
  userPrefernce: UserPrefernce; //=UserPrefernce.getInstance();
  loginUsers: Array<any>;
  showedAlert: boolean;
  userShow: boolean = false;
  confirmAlert = this.alertCtrl.create({
    title: "Exit App",
    message: "Are you sure to exit?",
    buttons: [
      {
        text: "No",
        handler: () => {
          this.showedAlert = false;
          return;
        }
      },
      {
        text: "Yes",
        handler: () => {
          this.platform.exitApp();
        }
      }
    ]
  });

  icon: string = "ios-add-outline";
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private privilageService: PrivilageService,
    private session: UserSessionService,
    private modal: ModalController,
    private events: Events,
    private commonServices: CommonServices,
    // private push: Push,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private deviceService: DeviceService,
    public fcm: FCM
  ) {
    this.initializeApp();

    this.userPrefernce = this.session.findUserDetails();
    this.loginUsers = this.session.findUsers();
    this.menu = this.privilageService.privilaged(this.userPrefernce.module);
    this.deviceService.initSubscribers();

    this.events.subscribe("LOGIN_USER_EVENT", () => {
      this.userPrefernce = this.session.findUserDetails();
      this.loginUsers = this.session.findUsers();
      this.menu = this.privilageService.privilaged(this.userPrefernce.module);

      console.log("LOGIN_USER_EVENT..!", JSON.stringify(this.userPrefernce));
    });
    this.pages = [
      {
        icon: "ios-log-in-outline",
        title: "Logout",
        component: "LogoutComponent"
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushNotificationSetup();

      /*
      if(this.platform.is('cordova')){
        
      }
      else{
        console.log("web View..");
      }
      */

      
      this.showedAlert = false;
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;
      this.platform.registerBackButtonAction(() => {
        if (this.nav.length() == 1) {
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            this.platform.exitApp();
          } else {
            let toast = this.toastCtrl.create({
              message: "Press back again to exit App?",
              duration: 3000,
              position: "bottom"
            });
            toast.present();
            lastTimeBackPress = new Date().getTime();
          }
        } else {
          this.nav.pop({});
        }
      });
    });
  }

  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert.present();
  }

  toggleDetails(menu) {
    if (menu.showDetails) {
      menu.showDetails = false;
      menu.icon = "ios-add-outline";
    } else {
      menu.showDetails = true;
      menu.icon = "ios-remove-outline";
    }
  }
  toggleUsers(isShow) {
    if (isShow) {
      this.userShow = false;
      this.icon = "ios-add-outline";
    } else {
      this.userShow = true;
      this.icon = "ios-remove-outline";
    }
  }

  openHome() {
    this.nav.setRoot("HomeComponent").catch(err => console.error(err));
  }
  openPage(page) {
    console.log(page);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // page.component = item array.component -->
    //this.nav.setRoot(page.component);
    this.nav.setRoot(page.component).catch(err => console.error(err));
    //this.nav.push(page.component).catch(err => console.error(err));
  }

  onAddAccount() {
    let modal = this.modal.create("AddAccountComponent");
    modal.onDidDismiss(isaddAccount => {
      if (isaddAccount) {
        this.nav.setRoot("AddAccountComponent");
      }
    });
    modal.present();
  }

  onSwitchAccount(userId: number) {
    this.session.switchAccount(userId);
    this.events.publish("LOGIN_USER_EVENT");
    this.nav.setRoot(
      UserSessionService.findDashBoardByModule(this.session.findModule())
    );
  }
  onViewProfile() {
    this.nav.push("ViewProfileComponent");
  }

  onHome1() {
    this.nav.setRoot(
      UserSessionService.findDashBoardByModule(this.session.findModule())
    );
  }

  pushNotificationSetup() {
    this.fcm.subscribeToTopic('education');
    this.fcm.getToken().then(token=>{
        if(token&&token.length>0)
          localStorage.setItem("registrationId", token);
    });
    this.fcm.onNotification().subscribe(data=>{
      if(data.wasTapped){
      } else {
        this.commonServices.presentToast(
          "You have new notification.",
          null,
          "info"
        );
        this.events.publish("notification:updateCount");
      };
    });
    this.fcm.onTokenRefresh().subscribe(token=>{
      if(token&&token.length>0)
        localStorage.setItem("registrationId", token);
    })
  }
}
