/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import {Device} from '../../model/notification/device.model';
import {BaseService} from '../core/base.service';
import {UserSessionService} from '../../service/core/user.session.service'
import {PagedResponse} from '../../model/common/PaggedResponse';

@Injectable()
export class NotificationService extends BaseService<Device> {

  
 constructor(@Inject(Http) protected http: Http,
  @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
  @Inject(UserSessionService) protected userSessionService:UserSessionService){
    super(http,errorHandler);
 }

 public findAllByRemoteIdAndModule(remoteId:number,module:string): Observable<PagedResponse> {
  
      let url: string = ServerConfig.getPath() +
    "/notifications/receivers/"+module+"/"+remoteId+"/?RESPONSE_VIEW=NotificationReceiver.Details";

    return this.findAll(url);
 }

 public findById(id:number):Observable<any>{
  
      let url: string = ServerConfig.getPath() +
       "/notifications/receivers/"+id+"/?RESPONSE_VIEW=NotificationReceiver.Details";
  return this.find(url,id);
 }

 public readMessage(id:number):Observable<any>{
  
      let url: string = ServerConfig.getPath() +
      "/notifications/receivers/"+id+"/changeStatus/?RESPONSE_VIEW=NotificationReceiver.Details&status=READ";
  
      return this.changeStatus(url);  
}

public registerNotificationUser():Observable<any>{
  
      let device = new Device();
      let registerDeviceId = null;
      device.receiverId =this.userSessionService.findRemote(); 
      device.receiverType = this.userSessionService.findModule();
      device.registrationId  = registerDeviceId;
  
      let url: string = ServerConfig.getPath() +"/devices";
      return this.save(url,device);
  
  }

}
