/**
* @module SDKBrowserModule
* @author Anjit
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
**/

import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import {UserAuth} from '../shared/services/core/auth.service';
import {LoginService} from '../shared/services/userauth/login.auth';
import {BaseModels} from '../shared/models/custom/base.models';
import {JSONSearchParams} from '../shared/services/core/search.params';
import {ErrorHandler} from '../shared/services/core/error.service';
import {NotificationService} from '../shared/services/notification/notification.service';
import {AddAcccountService} from '../shared/services/add-account/add.account.service';

/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    []
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: StorageBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
       UserAuth,
       LoginService,
       BaseModels,AddAcccountService,
       JSONSearchParams,ErrorHandler,
        internalStorageProvider,NotificationService,
        { provide: SDKStorage, useClass: StorageBrowser },
      ]
    };
  }
}

export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
