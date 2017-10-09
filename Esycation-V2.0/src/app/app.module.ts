import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';

//***********  Angularfire2 v4 **************/

import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


//*********** Provider **************/
import { AuthData } from '../providers/auth-data';
import { RadioPlayer } from '../providers/radio-service';


//*********** Image Gallery **************/
import { GalleryModal } from 'ionic-gallery-modal';
import { ZoomableImage } from 'ionic-gallery-modal';


//********** firebase configuration  ************ */
export const config = {
  apiKey: "AIzaSyD59dHa51HDOS9GxzqjOxiVQafG3IzAQoc",
  authDomain: "educoresystems-9ba56.firebaseapp.com",
  databaseURL: "https://educoresystems-9ba56.firebaseio.com",
  projectId: "educoresystems-9ba56",
  storageBucket: "educoresystems-9ba56.appspot.com",
  messagingSenderId: "1069407400206"
};

//********** Base service  ************ */
import { HttpModule} from '@angular/http';
import {CommonServices} from '../providers/service/common/common.service';
import {PrivilageService} from '../providers/service/core/privilage.service';
import {CostumErrorHandler} from '../providers/service/core/error.service';
import {AuthService} from '../providers/service/core/auth.service';
import {UserSessionService} from '../providers/service/core/user.session.service';
import {LocalStorage} from '../providers/storage/local.storage';
@NgModule({
  declarations: [
    MyApp, 
    GalleryModal,
    ZoomableImage,

  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GalleryModal,
    ZoomableImage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,CommonServices,PrivilageService,CostumErrorHandler,
    AuthService,UserSessionService,LocalStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    RadioPlayer
  ]
})
export class AppModule {}
