import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoopBackConfig, RealTime } from '../shared/sdk';
import { CONFIG } from './base.url';
import { CommonServices } from '../shared/services/common.service';
import { IntroComponent } from '../pages/intro/intro.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { NewsComponent } from '../pages/news/news.component';
import { PeopleComponent } from '../pages/people/people.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { ShopComponent } from '../pages/shop/shop.component';
import { SettingsComponent } from '../pages/settings/settings.component';

@Component({
  selector: 'page-root',
  templateUrl: 'app.html'
})

export class AppComponent {
  @ViewChild(Nav) nav: Nav;
  color: string = '#009688';
  rootPage: any = IntroComponent;

  pages: Array<{ title: string, component: any, icon: string; image: boolean, show: boolean }> = [];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private events: Events,
    private rt: RealTime,
    private commonServices: CommonServices
  ) {
    this.initializeApp();

    /*
    Array of pages that is used in the apps menu.
    when the event isloggedIn is fired, the pages is modified to show a profile page as well.
     */
    this.events.subscribe('isLoggedIn', () => {
      this.pages = [
        { title: 'Profile', component: ProfileComponent, icon: commonServices.currentUser.picture, image: true, show: false },
        { title: 'Dashboard', component: DashboardComponent, icon: 'analytics-outline', image: false, show: false },
        { title: 'News', component: NewsComponent, icon: 'paper-outline', image: false, show: false },
        { title: 'People', component: PeopleComponent, icon: 'people-outline', image: false, show: false },
        { title: 'Chat', component: ChatComponent, icon: 'chatboxes-outline', image: false, show: false },
        { title: 'Shop', component: ShopComponent, icon: 'basket-outline', image: false, show: false },
        { title: 'Settings', component: SettingsComponent, icon: 'settings-outline', image: false, show: false },
      ];
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    /*
      Set the URL and API version to the server where loopback project is hosted
      CONFIG is a constant exported from base.url.ts found in src/app/base.url.ts
    */
    LoopBackConfig.setBaseURL(CONFIG.BASE_URL);
    LoopBackConfig.setApiVersion(CONFIG.API_VERSION);
    /*
    start realtime to listen for events.
    useful links: http://docs.fireloop.io/en/api/
                https://github.com/mean-expert-official/loopback-component-realtime
    */
    this.rt.onReady().subscribe(() => { })
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
