import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ViewController, Events } from 'ionic-angular';
import { Contact, ContactApi } from '../../../shared/sdk';
import { CommonServices } from '../../../shared/services/common.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'chat-user-edit',
  templateUrl: 'edit-user.html'
})
export class EditChatUserComponent {
  user: Contact
  contact: Contact;
  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 250,
    targetHeight: 250,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private contactApi: ContactApi,
    private actionSheetCtrl: ActionSheetController,
    private viewCtrl: ViewController,
    private events: Events,
    private camera: Camera,
    private commonServices: CommonServices
  ) {
    this.contact = navParams.get('contact')
    this.user = commonServices.currentUser;
  }

  saveContact() {
    this.contactApi.upsert(this.contact).subscribe(
      (contact: Contact) => {
        this.user = Object.assign(this.commonServices.currentUser, contact);
        this.commonServices.presentToast('Contact Information Updated')
        this.viewCtrl.dismiss(this.user);
      });
  }

  addPicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Send Image from',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA
            this.getPictures(this.cameraOptions)
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
            this.getPictures(this.cameraOptions)
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

  getPictures(cameraOptions: CameraOptions) {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      this.contact.picture = 'data:image/jpeg;base64,' + imageData;
    }, (error) => {
      this.commonServices.showAlert('Error', error.message, 'CLOSE');
    });
  }


}
