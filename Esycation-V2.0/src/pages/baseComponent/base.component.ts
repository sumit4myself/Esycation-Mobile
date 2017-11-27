import { NavController} from 'ionic-angular';
import {UserSessionService} from '../../providers/service/core/user.session.service';

export abstract class BaseComponent {
    
   public notificationCount:String;

    constructor(protected service:UserSessionService,
                protected navCtrl:NavController){
      this.notificationCount=localStorage.getItem("notificationCount");      
      //console.log("BaseComponent.........!",this.notificationCount);   
    }

    onNotification(){
        
        console.log("onNotification............");     
        this.navCtrl.push('ViewAllNotificationComponent');
    }

}