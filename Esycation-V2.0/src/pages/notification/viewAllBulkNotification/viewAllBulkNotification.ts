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
        
         console.log("ViewAllBulkNotificationComponent==",this.session);
      }

    ionViewDidLoad(){

        this.bulkNotificationService.manage().subscribe(data=>{
            this.notifications = data.contents;
            if(this.notifications.length>0){
                for(let notification of this.notifications){
                    notification.colorId = this.findColor(notification.template.mode);
                    notification.str = this.findFirstLatter(notification.template.mode);
                }
                //console.log("notifications==",JSON.stringify(this.notifications));
            }
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

    findColor(title:string):string{

        let type = title.substring(0,1);
        if (type == 'S')
            return "#EA1E63";
        else if (type == 'O')
            return "#0059B2";
        else if (type == 'E')
            return "#8dc34b";
        else if (type == 'P')
            return "#ff9800";
        else
            return "#9e9e9e";
    }

    findFirstLatter(title:string):string{

      return title.substring(0,1);
    }
}
