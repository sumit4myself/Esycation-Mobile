import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ActionSheetController, ViewController, Events, LoadingController, Loading } from 'ionic-angular';
import { Contact, ContactApi } from '../../../shared/sdk';
import { CommonServices } from '../../../shared/services/common.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditComponent implements OnInit {
  user: Contact
  contact: Contact;
  titles: string[] = ['Mr', 'Mrs', 'Miss', 'Dr', 'Sgt', 'Honorable', 'Prof', 'Other',]
  loading: Loading;
  cameraOptions: CameraOptions;
  profileForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private contactApi: ContactApi,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private viewCtrl: ViewController,
    private fb: FormBuilder,
    private events: Events,
    private commonServices: CommonServices,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.cameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 350,
      targetHeight: 350,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };
    this.contact = this.navParams.get('contact')
    this.user = this.commonServices.currentUser;
    this.buildForm(this.contact);
  }

  buildForm(profile?: Contact): void {
    this.profileForm = this.fb.group({
      id: [profile ? profile.id : null],
      firstname: [profile ? profile.firstname : '', Validators.required],
      lastname: [profile ? profile.lastname : '', Validators.required],
      title: [profile ? profile.title : ''],
      gender: [profile ? profile.gender : ''],
      othernames: profile ? profile.othernames : '',
      picture: profile ? profile.picture : '',
      address: profile ? profile.address : '',
      town: profile ? profile.town : '',
      country: [profile ? profile.country : ''],
      postal_code: [profile ? profile.postal_code : ''],
      updated_at: [new Date()],
      updated_by: [this.user.id],
      email: [profile ? profile.email : ''],
      phone: [profile ? profile.phone : ''],
    });
  }

  saveContact({ value, valid }: { value: Contact, valid: boolean }) {
    if (valid) {
      this.loading = this.loadingCtrl.create({
        content: 'Save Contact...'
      }); this.loading.present();
      this.contactApi.upsert(Object.assign(this.commonServices.currentUser, value)).subscribe(
        (contact: Contact) => {
          this.loading ? this.loading.dismissAll() : null;
          this.commonServices.currentUser = this.contact = Object.assign(this.commonServices.currentUser, contact);
          this.events.publish('isLoggedIn'); //change menu based with this event (changes the image on profile menu)
          this.commonServices.presentToast('Contact Information Updated')
          this.viewCtrl.dismiss();
        });
    }
  }

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
      this.contact.picture = this.profileForm.value['picture'] = 'data:image/jpeg;base64,' + imageData;
    }, (error) => {
      this.commonServices.showAlert('Error', error.message, 'CLOSE');
    });
  }

}
