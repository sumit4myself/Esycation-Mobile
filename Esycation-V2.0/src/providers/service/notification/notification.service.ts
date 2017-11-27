/* tslint:disable */
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import {Device} from '../../model/notification/device.model';
import {BaseService} from '../core/base.service';
import {UserSessionService} from '../../service/core/user.session.service'
import {PagedResponse} from '../../model/common/PaggedResponse';
import {NotificationDetails} from '../../model/notification/notification.model';
import {CommonServices} from '../common/common.service';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Injectable()
export class NotificationService extends BaseService<Device> {

  notifications:Array<NotificationDetails>;
  notificationDetails:NotificationDetails=new NotificationDetails();
 constructor(@Inject(Http) protected http: Http,
  @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
  @Inject(UserSessionService) protected userSessionService:UserSessionService,
  @Inject (CommonServices) protected commonServices:CommonServices,
//  protected push:Push
){
    super(http,errorHandler);
 }

 public findAllByRemoteIdAndModule(remoteId:number,module:string): Observable<PagedResponse> {
  
      this.notifications = new Array<NotificationDetails>();
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

  public registerNotificationUser(registerId:string):Observable<any>{
  
      let device = new Device();
      device.receiverId =this.userSessionService.findRemote(); 
      device.receiverType = this.userSessionService.findModule();
      device.registrationId  = registerId;
      let url: string = ServerConfig.getPath() +"/devices";
      
      return this.save(url,device);

  }

  /*
  pushNotificationSetup():Boolean {

    //this.commonServices.presentToast("pushNotificationSetup.....!");
    this.commonServices.showAlert("Notification","hhhhhhhhhhh");
    let isViewAll = false;
        const options: PushOptions = {
            android: {
            sound: true,
            vibrate:true,
            iconColor:"#f53d3d",

            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };   
        const pushObject: PushObject = this.push.init(options);
    
        pushObject.on('notification').subscribe((notification: any) => {

            this.commonServices.presentToast(notification);
            this.commonServices.showAlert("Notification",JSON.stringify(notification));
            isViewAll=true;
        });
        pushObject.on('registration').subscribe((registration: any) => {
         this.commonServices.showAlert("You have resigter :",JSON.stringify(registration));
        });
        pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));

        return isViewAll;
    }
 */
}
