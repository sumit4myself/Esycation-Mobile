import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';

//********** Base service  ************ */
import { HttpModule } from '@angular/http';
import { CommonServices } from '../providers/service/common/common.service';
import { PrivilageService } from '../providers/service/core/privilage.service';
import { CostumErrorHandler } from '../providers/service/core/error.service';
import { AuthService } from '../providers/service/core/auth.service';
import { UserSessionService } from '../providers/service/core/user.session.service';
import { LocalStorage } from '../providers/storage/local.storage';
import { Push } from '@ionic-native/push';
import { NotificationService } from '../providers/service/notification/notification.service';
import { DeviceService } from '../providers/service/notification/device.service';
import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    FCM,
    StatusBar,
    SplashScreen, CommonServices, PrivilageService, CostumErrorHandler, Push, NotificationService, DeviceService,
    AuthService, UserSessionService, LocalStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class AppModule { }
