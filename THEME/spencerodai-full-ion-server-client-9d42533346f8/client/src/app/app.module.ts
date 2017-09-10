import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { MomentModule } from 'angular2-moment';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { CustomFormsModule } from 'ng2-validation'
import { SDKBrowserModule } from '../shared/sdk/index';
import { APPCONFIG, MyAuthConfig } from './base.url';
import { IntroModule } from '../pages/intro/intro.module';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { NewsModule } from '../pages/news/news.module';
import { ChatModule } from '../pages/chat/chat.module';
import { PeopleModule } from '../pages/people/people.module';
import { ProfileModule } from '../pages/profile/profile.module';
import { ShopModule } from '../pages/shop/shop.module';
import { SettingsModule } from '../pages/settings/settings.module';
import { CommonServices } from '../shared/services/common.service';
import { PlacesServices } from '../shared/services/places.service';
import { CustomPipesModule } from '../shared/pipes/custom-pipes.module';

// Native Components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { Clipboard } from '@ionic-native/clipboard';
import { Geolocation } from '@ionic-native/geolocation';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot(AppComponent, APPCONFIG),
    MomentModule,
    CustomFormsModule,
    CustomPipesModule,
    SDKBrowserModule.forRoot(),
    Ng2UiAuthModule.getWithConfig(MyAuthConfig),
    IntroModule,
    DashboardModule,
    NewsModule,
    ChatModule,
    PeopleModule,
    ProfileModule,
    ShopModule,
    SettingsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Calendar,
    Camera,
    CallNumber,
    Clipboard,
    Geolocation,
    ImagePicker,
    SocialSharing,
    CommonServices,
    PlacesServices,
    { provide: ErrorHandler, useClass: IonicErrorHandler }

  ]
})
export class AppModule { }
