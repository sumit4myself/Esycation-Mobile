import { Component } from '@angular/core';
import { Events ,NavController} from 'ionic-angular';
import { NotificationService } from '../../../providers/service/notification/notification.service';
import { UserSessionService } from '../../../providers/service/core/user.session.service';

@Component({
  selector: 'notification-counter',
  template: "<ion-icon ios='ios-notifications' md='md-notifications'></ion-icon>"+
            "<span *ngIf='counter!=0' class='notification'> <ion-badge color='ios-red'>{{counter}}</ion-badge></span>",

})
export class PushCounterComponent {

  counter: number = 0;
  constructor(
    private notificationService: NotificationService,
    private session: UserSessionService,
    private events: Events,
     private navCtrl:NavController) {  

    this.counter=this.session.findNotificationCount();
    this.events.subscribe("notification:updateCount", () => {
      console.log("notification:updateCount...!");
      this.notificationService.countAllByRemoteIdAndModule(this.session.findRemote(), this.session.findModule()).subscribe(count => {
        this.session.setNotificationCount(count);
        this.counter=count;
      });

    });

  }

  onNotification(){

    console.log("PushCounterComponent onNotification...");

    this.navCtrl.push('ViewAllNotificationComponent');
  }

}


