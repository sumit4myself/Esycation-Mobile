import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
//import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommonServices {

    constructor(
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
    ) { }

  
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

    confirmAlert(title:string,message:string,yes?:string,no?:string){
        
        !yes? yes="yes" :null;
        !no? no="No":null;
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: yes,
              handler: () => {
               console.log("Yes Confirm alert.....");   
               alert.dismiss(true);
               
              }
            },
            {
                text: no,
                role: 'cancel',
                handler: () => {
                    console.log("Cancel Confirm alert.....");
                    
                    
                }
              }
          ]
        });

        alert.present();
    }

}