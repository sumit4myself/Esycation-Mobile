import {Injectable,Inject} from '@angular/core'
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {CommonServices} from '../common/common.service';
import { Storage  } from '@ionic/storage';
import {ServerConfig} from '../../config';

@Injectable()
export class NotificationService{

    
    constructor(@Inject(CommonServices) protected commonServices:CommonServices,
                @Inject(Storage) protected storage:Storage,
                private push:Push){}

    pushNotificationSetup():Boolean {
        let isViewAll = false;
        const options: PushOptions = {
            android: {},
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };   
        const pushObject: PushObject = this.push.init(options);
        
            pushObject.on('notification').subscribe((notification: any) => {
            if (notification.additionalData.foreground) {
                this.commonServices.presentToast(notification.message);
                this.commonServices.showAlert("Notification",notification.message);
                this.storage.set("notification",notification);
                isViewAll=true;
            }
            });
            pushObject.on('registration').subscribe((registration: any) => {
             this.commonServices.presentToast("You have resigter :"+JSON.stringify(registration));
             this.storage.set("registerId",registration.registrationId);
            });
            pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));

            return isViewAll;
        }
            
}