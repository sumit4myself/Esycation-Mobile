/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseModels } from '../../models/custom/base.models';
import { BaseLoopBackApi } from '../core/base.service';
import { ServerConfig } from '../../lb.config';
import { UserAuth } from '../core/auth.service';
import { LoopBackFilter, UserPrefernce, AccessToken } from '../../models/baseModel/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import {Device} from '../../models/notification/device.model';

@Injectable()
export class NotificationService extends BaseLoopBackApi {

  userPrefernce:UserPrefernce;
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(BaseModels) protected models: BaseModels,
    @Inject(UserAuth) protected auth: UserAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  models, auth, searchParams, errorHandler);
  }


  public findAll(remoteId:number,module:string): Observable<any> {

    let _method: string = "GET";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() + 
    //"/notifications/?RESPONSE_VIEW=Notification.Ignore";
  "/notifications/receivers/"+module+"/"+remoteId+"/?RESPONSE_VIEW=NotificationReceiver.Details";
    console.log("_url====",_url);
    
    let _routeParams: any = {};
    let _urlParams: any = {};
    let _postBody: any = {
      //credentials: credentials
    };
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody)
      .map(
        (response: any) => {
          return response;
        }
      );
      return result;
  }

  public findById(id:number):Observable<any>{

    let _method: string = "GET";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() +
     "/notifications/receivers/"+id+"/?RESPONSE_VIEW=NotificationReceiver.Details";

    let _routeParams: any = {};
    let _urlParams: any = {};
    let _postBody: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody)
      .map(
        (response: any) => {
          return response;
        }
      );
      return result;
  }
  public readMessage(id:number):Observable<any>{


    let _method: string = "PATCH";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() +
     "/notifications/receivers/"+id+"/changeStatus/?RESPONSE_VIEW=NotificationReceiver.Details&status=READ";

     console.log("_url==",_url);

    let _routeParams: any = {};
    let _urlParams: any = {};
    let _postBody: any = {};
    return this.request(_method, _url, _routeParams, _urlParams, _postBody);

  }

  public registerNotificationUser():Observable<any>{

    let device = new Device();
    let registerDeviceId = this.auth.load("registerId")
    this.userPrefernce = this.auth.getUserPrefernce()
    device.receiverId =this.userPrefernce.remoteId; 
    device.receiverType = this.userPrefernce.module;
    device.registrationId  = registerDeviceId;

    let _method: string = "POST";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() +
     "/devices";
     let _postBody: any = {
        data: device
    }; 
    let _routeParams: any = {};
    let _urlParams: any = {};
    
    console.log("_url==",_url,JSON.stringify(_postBody));

    return this.request(_method, _url, _routeParams, _urlParams, _postBody);

  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public getModelName() {
    return "Notification";
  }
}
