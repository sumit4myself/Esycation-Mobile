import { Component } from '@angular/core';
import { IonicPage,Nav} from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';
@IonicPage()
@Component({
  selector: 'view-all-bulk-notification',
  templateUrl: 'viewAllBulkNotification.html'
})
export class ViewAllBulkNotificationComponent {
  
    notifications:Array<any>;
     constructor(
         private session:UserSessionService,
         private nav:Nav,
         private bulkNotificationService:BulkNotificationService ) {
        
         console.log("ViewAllBulkNotificationComponent==",this.session,this.bulkNotificationService);
      }

    ionViewDidLoad(){

        this.bulkNotificationService.manage().subscribe(data=>{
            this.notifications = data.contents;

            console.log(JSON.stringify(this.notifications));
        });
    }

    onAddNew(){
        this.nav.push("BulkNotificationComponent");
    }

    onEdit(id:number){
        this.nav.push("EditBulkNotificationComponent",{id:id});
    }

    onView(id:number){
        this.nav.push("ViewBulkNotificationsComponent",{id:id});
    }

    onDelete(id:number){
        this.nav.push("DeleteBulkNotificationsComponent",{id:id});
    }
}
