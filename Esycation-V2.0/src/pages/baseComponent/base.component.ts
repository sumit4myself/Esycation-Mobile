import { NavController} from 'ionic-angular';
import {UserSessionService} from '../../providers/service/core/user.session.service';
//import {NotificationService} from '../../providers/service/notification/notification.service';

export abstract class BaseComponent {
    
   public notificationCount:String;

    constructor(protected service:UserSessionService,
                protected navCtrl:NavController){
      this.notificationCount=localStorage.getItem("notificationCount");      
              
    }

    onNotification(){
        
        this.navCtrl.push('ViewAllNotificationComponent');
    }
    

}