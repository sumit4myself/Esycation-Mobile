import { Component } from '@angular/core';
import { LoadingController, AlertController, ActionSheetController, ModalController, Events } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Preference, PreferenceApi } from '../../../shared/sdk';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EditChatUserComponent } from './edit-user.component';

@Component({
  selector: 'chat-settings',
  templateUrl: 'chat-settings.html'
})
export class ChatSettingsComponent {

  user: Contact
  setting: Preference;
  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 250,
    targetHeight: 250,
    sourceType: this.camera.PictureSourceType.CAMERA
  };

  constructor(
    private commonServices: CommonServices,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private settingApi: PreferenceApi,
    private actionSheetCtrl: ActionSheetController,
    private events: Events,
    private modalCtrl: ModalController,
    private camera: Camera
  ) {
    this.user = commonServices.currentUser;
    this.setting = this.user.preference;
  }

  ionViewDidLoad() {
  }

  changeWallpaper() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change Chat Wallpaper',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA
            this.getPictures(this.cameraOptions);
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
             this.getPictures(this.cameraOptions);
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

  getPictures(cameraOptions) {
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.setting.chatWallpaper = 'data:image/jpeg;base64,' + imageData;
      this.saveSetting(this.setting);
    }, (error) => {
      this.commonServices.showAlert('Error', error.message);
    });
  }

  editUser() {
    let modal = this.modalCtrl.create(EditChatUserComponent, { contact: this.user });
    modal.onDidDismiss((contact: any) => {
      if (contact) {
        this.commonServices.currentUser = this.user = contact;
        this.events.publish('isLoggedIn'); //change menu based with this event (changes the image on profile menu)
      }
    });

    modal.present();
  }

  showArchives() {
    this.setting.chat_archives ? this.setting.chat_archives = false : this.setting.chat_archives = true;
  }

  saveSetting(setting) {
    setting.contactId = this.user.id;
    this.settingApi.upsert(setting).subscribe(
      (setting: Preference) => {
        this.user.preference = Object.assign(setting, this.user.preference);
        this.commonServices.currentUser = this.user;
        this.events.publish('isLoggedIn');
        this.setting = setting
        this.commonServices.presentToast(this.user.firstname + 's settings has been saved');
      },
      (error) => { this.commonServices.showAlert('Error', error.message); });
  }
}
