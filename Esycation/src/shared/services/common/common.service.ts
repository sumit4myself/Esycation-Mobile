import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {UserAuth} from '../../services/core/auth.service'
import { UserPrefernce } from '../../models/baseModel/BaseModels';

@Injectable()
export class CommonServices {

    constructor(
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private auth: UserAuth,
        private sanitizer: DomSanitizer
    ) { }

    public currentUser(): UserPrefernce {
     return this.auth.getUserPrefernce();
    }
    public findByUserId(userId:number):UserPrefernce{
        
        return this.auth.findByUserId(userId);
    }
    
    public findCurrentUserId():number{
        return this.auth.getCurrentUserId();
    }
    
    rememberMe(data) {
        
        this.auth.setUser(data);
        this.auth.setUserPrefernce(data)
        this.auth.save();
    }

    presentToast(message?: string, duration?: string) {
        let durationTime = 0;
        if (duration === 'long') {
            durationTime = 5000;
        } else if (duration === 'short') {
            durationTime = 2500;
        } else {
            durationTime = 3500;
        }
        let toast = this.toastCtrl.create({
            message: message,
            duration: durationTime,
            cssClass :"secondary"
        });
        toast.present();
    }

    showAlert(title: string, subTitle: string, buttons?: string) {
        !buttons ? buttons = "OK" : null;
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [buttons]
        });
        alert.present();
    }

}