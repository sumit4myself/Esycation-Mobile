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
                    notification.colorId = this.findColor(notification.id);
                    notification.str = this.findFirstLatter(notification.template.mode);
                }
                console.log("notifications==",JSON.stringify(this.notifications));
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

    findColor(id:number):string{

        let renVal2=id+2;
        let renVal3=id+4;
        let color = 'rgb(' + (Math.floor(Math.random() * id)) + ',' 
        + (Math.floor(Math.random() * renVal2)) + ',' 
        + (Math.floor(Math.random() * renVal3)) + ')';
        //console.log("color==",color);

        return color;
    }

    findFirstLatter(title:string):string{

      return title.substring(0,1);
    }
}
