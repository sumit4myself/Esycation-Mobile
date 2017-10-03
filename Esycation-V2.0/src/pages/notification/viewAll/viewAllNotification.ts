import { Component } from '@angular/core';
import { NavController,Events,LoadingController, Loading} from 'ionic-angular';

//import {ViewNotificationComponent} from '../view/view-notification.component';
//import {NotificationService} from '../../../shared/services/notification/notification.service';
//import {NotificationDetails} from '../../../shared/models/notification/notification.model';
//import { CommonServices } from '../../../shared/services/common/common.service';
//import {UserPrefernce} from '../../../shared/models/baseModel/BaseModels';
@Component({
  selector: 'view-all-notification-page',
  templateUrl: 'viewAllNotification.html'
})
export class ViewAllNotificationComponent {

public notifications=new Array<any>();   
// public notifications=new Array<NotificationDetails>();
//userDetails:UserPrefernce;
 loading: Loading; 
 remoteId:number;
 module:string;

 constructor(
    private navCtrl: NavController,
    private events:Events,
    private loadingCtrl: LoadingController,
 //   private notificationService:NotificationService,
   // private commonServices:CommonServices
) {
        /*
        this.userDetails = this.commonServices.currentUser();
        //console.log("module==",this.userDetails.module,"RemoteId ==",this.userDetails.remoteId);
        this.remoteId=this.userDetails.remoteId;
        this.module = this.userDetails.module;
        this.findAllNotifications(this.remoteId,this.module);
        */
    }

    /*
    findAllNotifications(remoteId:number,module:string){
        this.loading = this.loadingCtrl.create({
            content: 'Loading..'
        }); this.loading.present();
        this.notificationService.findAll(remoteId,this.module).subscribe(data=>{
            this.notifications = data;
            this.loading.dismissAll();
        },
        rrror=>{
            this.loading.dismissAll();
        });
    }

    onView(id:number){
        this.navCtrl.push(ViewNotificationComponent,{id:id});
    }
*/
    onDelete(id:number){
        console.log("delete notification..");
    }
}
