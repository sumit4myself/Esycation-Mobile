import { Component } from '@angular/core';
import { IonicPage,LoadingController, Loading} from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {NotificationService} from '../../../providers/service/notification/notification.service';
import {NotificationDetails} from '../../../providers/model/notification/notification.model';
//import {PagedResponse} from '../../../providers/model/common/PaggedResponse';

@IonicPage()
@Component({
  selector: 'view-all-notification-page',
  templateUrl: 'viewAllNotification.html'
})
export class ViewAllNotificationComponent {
  
     public notifications=new Array<NotificationDetails>();
     loading: Loading; 
     remoteId:number;
     module:string;
     shownDetail = null;
     constructor(
         private loadingCtrl: LoadingController,
         private session:UserSessionService,
         private notificationService:NotificationService) {
        
         this.remoteId=this.session.findRemote();
         this.module = this.session.findModule();
         this.findAllNotifications(this.remoteId,this.module);
        
      }

    findAllNotifications(remoteId:number,module:string){
        
        this.loading = this.loadingCtrl.create({
            content: 'Loading..'
        }); this.loading.present();
        this.notificationService.findAllByRemoteIdAndModule(remoteId,module).subscribe(data=>{
           
            for(let notification of data.contents){
                let b = Object.assign({},notification);
                this.notifications.push(b);
              }
            this.loading.dismissAll();
            console.log("notifications===",this.notifications);
        },error=>{
            this.loading.dismissAll();
            console.log(error);
        });
    }

    onRead(id:number){
        this.notificationService.readMessage(id).subscribe();
    }
 
    toggleDetail(group) {
        if (this.isDetailShown(group)) {
            this.shownDetail = null;
        } else {
            this.shownDetail = group;
        }
    };
    isDetailShown(group) {
        return this.shownDetail === group;
    };
}
