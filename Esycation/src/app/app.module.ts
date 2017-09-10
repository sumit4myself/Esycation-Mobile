import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { MomentModule } from 'angular2-moment';

import { SDKBrowserModule } from '../shared/index';
import { APPCONFIG, MyAuthConfig } from './base.url';

import { AppComponent } from './app.component';
import {AttendanceModule} from '../pages/attendances/attendance.module';
import {UserModule} from '../pages/user/user.module';
import {DefaultModule} from '../pages/default/default.module';
import {NotificationModule} from '../pages/notification/notification.module';
import {SettingModule} from '../pages/setting/setting.module';
import {ProfileModule} from '../pages/profile/profile.module';
import {CommonServices} from '../shared/services/common/common.service'
import {NotificationService} from '../shared/services/common/push.notification.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(AppComponent,APPCONFIG),
    SDKBrowserModule.forRoot(),
    MomentModule,
     AttendanceModule,
     UserModule,
     DefaultModule,
     NotificationModule,
     SettingModule,
     ProfileModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent
  ],
  providers: [
    
    StatusBar,
    SplashScreen,
    CommonServices,NotificationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler,
    }
  ]
})
export class AppModule {}
