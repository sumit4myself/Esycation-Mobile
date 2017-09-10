import {Injectable,Inject} from '@angular/core'
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {CommonServices} from '../common/common.service';
import {InternalStorage} from '../../storage/storage.swaps';

@Injectable()
export class NotificationService{

    constructor(@Inject(CommonServices) protected commonServices:CommonServices,
                @Inject(InternalStorage) protected storage:InternalStorage,
                private push:Push){}

    pushNotificationSetup():Boolean {
        let isViewAll = false;
        const options: PushOptions = {
            android: {
                senderID: '19285209844'
            },
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
                this.storage.set("notification",JSON.stringify(notification));
                isViewAll=true;
            }
            });
            pushObject.on('registration').subscribe((registration: any) => {
             this.commonServices.presentToast("You have resigter :"+JSON.stringify(registration));
             this.storage.set("registerId",JSON.stringify(registration));
            });
            pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));

            return isViewAll;
        }
            

}