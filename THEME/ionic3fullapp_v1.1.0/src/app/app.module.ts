import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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
   apiKey: 'your-key',
   authDomain: 'your-project-authdomain', 
   databaseURL: 'your-database-URL', 
   projectId: 'your-project-id', 
   storageBucket: 'your-storage-bucket', 
   messagingSenderId: 'your-messaging-sender-id' 
};
  
@NgModule({
  declarations: [
    MyApp, 
    GalleryModal,
    ZoomableImage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    RadioPlayer
  ]
})
export class AppModule {}
