declare var Object: any;

import { Component } from '@angular/core';
import { NavController,Events,NavParams,LoadingController, Loading} from 'ionic-angular';
import {NotificationService} from '../../../shared/services/notification/notification.service';
import {NotificationDetails} from '../../../shared/models/notification/notification.model';

@Component({
  selector: 'view-notification-page',
  templateUrl: 'view-notification.html'
})
export class ViewNotificationComponent {

 public notification=new NotificationDetails();
 loading: Loading; 
 constructor(
    private navCtrl: NavController,
    private events:Events,
    private navParams:NavParams,
    private notificationService:NotificationService,
    private loadingCtrl:LoadingController){}
 
    ionViewDidLoad(){
      let id = this.navParams.get("id");
      this.loading = this.loadingCtrl.create({
          content: 'Loading..'
        }); this.loading.present();
      this.notificationService.findById(id).subscribe(data=>{
         this.notification = Object.assign(this.notification, data);
       });
       this.notificationService.readMessage(id);
       this.loading.dismissAll();
    }
   
  viewFile(){
    
  } 
}
