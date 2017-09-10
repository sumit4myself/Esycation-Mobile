import { Component } from '@angular/core';
import { NavController, ActionSheetController, Events } from 'ionic-angular';
import { CommonServices } from '../../shared/services/common.service';
import { LoopBackAuth, Contact, Preference, PreferenceApi, AccountApi } from '../../shared/sdk';
import { IntroComponent } from '../intro/intro.component';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsComponent {

  user: Contact
  setting: Preference;
  cameraOptions: CameraOptions

  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    protected auth: LoopBackAuth,
    private preferenceApi: PreferenceApi,
    private appuserApi: AccountApi,
    private events: Events,
    private commonServices: CommonServices,
    private camera: Camera
  ) {
    this.cameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 250,
      targetHeight: 250,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.user = commonServices.currentUser;
    this.setting = this.user.preference;
  }

  chatWallpaper() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Send Image from',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA
            this.getPicture(this.cameraOptions);
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
            this.getPicture(this.cameraOptions);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(cameraOptions: CameraOptions) {
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.setting.chatWallpaper = 'data:image/jpeg;base64,' + imageData;
    }, (error) => {
      this.commonServices.showAlert('Error', error.message, 'CLOSE');
    });
  }

  saveSetting(setting: Preference) {
    setting.contactId = this.user.id;
    this.preferenceApi.replaceOrCreate(setting).subscribe(
      (setting: Preference) => {
        this.setting = setting
        this.user.preference = Object.assign(setting, this.user.preference);
        this.commonServices.currentUser = this.user;
        this.events.publish('isLoggedIn');
        this.commonServices.presentToast(this.user.firstname + 's settings has been saved');
      },
      (error) => { this.commonServices.showAlert('Error', error.message); });
  }

  /*
    Log out user and make sure to clear local storage of user details with auth.clear()
    return to Intro Page
   */
  logout() {
    this.appuserApi.logout().subscribe(() => {
      this.auth.clear();
      this.navCtrl.setRoot(IntroComponent);
    }, (error) => { this.commonServices.showAlert('Error', error.message); })
  }

}
