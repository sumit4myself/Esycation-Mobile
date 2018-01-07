import { Component } from '@angular/core';
import { IonicPage,NavController} from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';
import {BaseComponent} from '../../baseComponent/base.component';
import { ServerConfig } from '../../../providers/config';
import {StaffDetails} from '../../../providers/model/notification/notification.staff.model';
import {StudentGuardian} from '../../../providers/model/notification/notification.studentGurdian.model';

@IonicPage()
@Component({
  selector: 'view-bulk-notification-p',
  templateUrl: 'viewBulkNotification.html'
})
export class ViewBulkNotificationsComponent extends BaseComponent {
   
  imagePath: String = ServerConfig.imagePath();
   staffs:Array<StaffDetails>=new Array<StaffDetails>();
   studentGuardians:Array<StudentGuardian>=new Array<StudentGuardian>();
   viewMode: string;
   staffDetailsNotFound:string=null;
   studentDetailsNotFound:string=null;
     constructor(private session:UserSessionService,
                 private bulkNotificationService:BulkNotificationService,
                 protected navControl:NavController ) {

            super(session,navControl)
            this.viewMode="first";
            console.log(this.session,this.bulkNotificationService);        
    }

    ionViewDidLoad(){

      this.bulkNotificationService.findSend("staffs","Staff.MinDetails").subscribe(data=>{
        if(data.contents.length==0){
          this.staffDetailsNotFound="Data not found.";
        }else{
          for(let d of data.contents){
            let s = Object.assign({},d);
            this.staffs.push(s);
          }        
        }
  
      });

      this.bulkNotificationService.findSend("guardians","Guardian.MinDetails").subscribe(data=>{
        
          if(data.contents.length==0){
            this.studentDetailsNotFound="Data not found.";
          }else{
            for(let d of data.contents){
              let s = Object.assign({},d);
              this.studentGuardians.push(s);
            }        
          }
          //console.log("Bulkstudent==",JSON.stringify(this.studentGuardians));
      });


    }


}
