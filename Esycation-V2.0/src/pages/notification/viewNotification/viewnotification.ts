import { Component } from '@angular/core';
import { IonicPage, NavParams} from 'ionic-angular';
//import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {NotificationService} from '../../../providers/service/notification/notification.service';
import {NotificationDetails} from '../../../providers/model/notification/notification.model';
import {CommonServices} from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'view-notifications-page',
  templateUrl: 'viewnotification.html'
})
export class ViewNotificationComponent {

     notification:NotificationDetails=new NotificationDetails();
     isLoaded:boolean=false;
     notificationCount:any=0;
     constructor(private notificationService:NotificationService,
         private navParams:NavParams,
         private commonServices:CommonServices) {
      }


      ionViewDidLoad(){
        this.commonServices.onLoader();
        this.notificationService.findById(this.navParams.get("id")).subscribe(data=>{

          let b = Object.assign({},data);
          this.notification=b;
          this.isLoaded = true;
          this.commonServices.onDismissAll();
         },error=>{
          this.commonServices.onDismissAll();
             console.log(error);
         });
      }

}
