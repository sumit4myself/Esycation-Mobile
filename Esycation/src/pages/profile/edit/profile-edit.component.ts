import { Component } from '@angular/core';
import { NavParams, ActionSheetController, LoadingController, Loading } from 'ionic-angular';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {CommonServices} from '../../../shared/services/common/common.service';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'profile-edit.html'
})
export class EditProfileComponent {
  
  
  loading: Loading;
  //profileForm: FormGroup;
  id:number;
  constructor(
    private loadingCtrl: LoadingController,
    private navParams :NavParams,
    //private actionSheetCtrl:ActionSheetController,
    //private cameraOptions:CameraOptions,
    //private camera:Camera,
    private commonServices:CommonServices
  ) {

  }
  ionViewDidEnter() {
    //this.getContact(this.user.id);
  }

/*
  addPicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Save Image from',
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
      //this.contact.picture = this.profileForm.value['picture'] = 'data:image/jpeg;base64,' + imageData;
    }, (error) => {
      this.commonServices.showAlert('Error', error.message, 'CLOSE');
    });
  }
  */
}
