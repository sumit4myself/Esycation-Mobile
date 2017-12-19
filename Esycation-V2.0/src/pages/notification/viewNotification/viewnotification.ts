import { Component } from '@angular/core';
import { IonicPage, NavParams} from 'ionic-angular';
//import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {NotificationService} from '../../../providers/service/notification/notification.service';
import {NotificationDetails} from '../../../providers/model/notification/notification.model';


@IonicPage()
@Component({
  selector: 'view-notifications-page',
  templateUrl: 'viewnotification.html'
})
export class ViewNotificationComponent {
  
     notification:NotificationDetails=new NotificationDetails();
    
     notificationCount:any=0;
     constructor(private notificationService:NotificationService,
         private navParams:NavParams   ) {
      }

      
      ionViewDidLoad(){

        this.notificationService.findById(this.navParams.get("id")).subscribe(data=>{

          let b = Object.assign({},data);
          this.notification=b;

         },error=>{
             console.log(error);
         });
      }

}
