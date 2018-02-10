import { Injectable } from "@angular/core";
import {
  AlertController,
  ToastController,
  Loading,
  LoadingController
} from "ionic-angular";

@Injectable()
export class CommonServices {
  loading: Loading;
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  presentToast(message?: string, duration?: string, type?: string) {
    let durationTime = 0;
    let classType = "toast-secondary";
    if (duration === "long") {
      durationTime = 5000;
    } else if (duration === "short") {
      durationTime = 2500;
    } else {
      durationTime = 3500;
    }

    if (type === "info") {
      classType = "toast-primary";
    } else if (type === "success") {
      classType = "toast-stable";
    } else if (type === "error") {
      classType = "toast-danger";
    } else {
      classType = "toast-secondary";
    }

    let toast = this.toastCtrl.create({
      message: message,
      duration: durationTime,
      cssClass: classType
    });
    toast.present();
  }

  showAlert(title: string, subTitle: string, buttons?: string) {
    !buttons ? (buttons = "OK") : null;
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [buttons]
    });
    alert.present();
  }

  confirmAlert(title: string, message: string, yes?: string, no?: string) {
    !yes ? (yes = "yes") : null;
    !no ? (no = "No") : null;
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
          role: "cancel",
          handler: () => {
            console.log("Cancel Confirm alert.....");
          }
        }
      ]
    });

    alert.present();
  }

  onLoader(Content?: string): void {
    !Content ? (Content = "Loading..") : null;
    this.loading = this.loadingCtrl.create({
      content: Content
    });
    this.loading.present();

    setTimeout(() => {
      this.loading.dismiss();
    }, 500);
    
  }

  onDismissAll(): void {

    //this.loading.dismissAll();
  }

  /*
    presentLoadingCustom() {
        let loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `
            <div class="custom-spinner-container">
              <div class="custom-spinner-box">
                loading..
              </div>
            </div>`,
          duration: 5000
        });

        loading.onDidDismiss(() => {
          console.log('Dismissed loading');
        });

        loading.present();
      }
*/
}
