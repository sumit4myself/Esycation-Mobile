import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { LoopBackAuth, Contact } from '../sdk';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CommonServices {

    currentUser: Contact;

    constructor(
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private auth: LoopBackAuth,
        private sanitizer: DomSanitizer
    ) { }

    rememberMe(data) {
        this.auth.setRememberMe(true)
        this.auth.setUser(data);
        this.auth.setToken(data);
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
            duration: durationTime
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