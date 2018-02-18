import { Component, OnInit } from '@angular/core';
import { IonicPage, Nav, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { ProfileService } from '../../../providers/service/profile/profile.service';
import { Profile, ProfileInterface } from '../../../providers/model/profile/model.profile';
import * as moment from 'moment';
import { CommonServices } from '../../../providers/service/common/common.service';
import { ServerConfig } from '../../../providers/config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileService } from '../../../providers/service/file/file.service';

@IonicPage()
@Component({
  selector: 'edit-profile-page',
  templateUrl: 'editprofile.html'
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  profile: Profile = Profile.getInstance();
  segmentView: string;
  moduleType: String;
  imageId: string = null;
  mySelectOptions: any = {};
  imagePath: String;
  formSubmitAttempt: boolean = false;
  cameraOptions: CameraOptions;
  picture: string = null;
  constructor(
    private formBuilder: FormBuilder,
    private nav: Nav,
    private session: UserSessionService,
    private actionSheetCtrl: ActionSheetController,
    private profileService: ProfileService,
    private commonServices: CommonServices,
    private camera: Camera,
    private fileService: FileService) {

    this.segmentView = "one";
    this.imagePath = ServerConfig.imagePath();
    this.moduleType = this.session.findModule();
    this.mySelectOptions = {
      mode: 'ios',
      cssClass: 'remove-ok'
    }

  }

  ngOnInit() {
    this.cameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 350,
      targetHeight: 350,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };
    this.buildForm();
  }


  buildForm() {

    this.profileForm = this.formBuilder.group({
      id: ['', [<any>Validators.required]],
      name: ['', [<any>Validators.required]],
      bloodGroup: ['', [<any>Validators.required]],
      gender: ['', [<any>Validators.required]],
      dob: ['', [<any>Validators.required]],
      mobile: ['', [<any>Validators.required, Validators.maxLength(10)]],
      email: ['', [<any>Validators.required]],
      adharNumber: '',
      address1: ['', [<any>Validators.required]],
      address2: '',
      city: ['', [<any>Validators.required]],
      state: ['', [<any>Validators.required]],
      pinCode: ['', [<any>Validators.required]],
      inTime: '',
      outTime: '',
      module: ['', [<any>Validators.required]],
      identificationMarks: '',
      nationality: '',
      religion: '',
      motherTongue: '',
      annualIncome: '',
      occupation: '',
      picture: '',
    });

    this.commonServices.onLoader();
    this.profileService.findProfileDetails(this.session.findRemote(), this.session.findModule())
      .subscribe(data => {
        this.commonServices.onDismissAll();
        this.profile = Object.assign(this.profile, data);
        this.profileForm.setValue(this.prepareData(this.profile));
        this.imageId = this.profile.imageId;
      }, error => {
        console.log("Error: ", error);
        this.commonServices.onDismissAll();
      });
  }

  onUpdate({ value, valid }: { value: ProfileInterface, valid: boolean }) {

    this.formSubmitAttempt = true;
    value.dob = moment(value.dob).format("MM/DD/YYYY");
    value.imageId = this.profile.imageId;
    // console.log("Edit Profile==",JSON.stringify(value),valid);
    this.commonServices.onLoader();
    if (valid) {
      this.profileService.editProfile(value).subscribe(data => {
        console.log(data);
        this.commonServices.onDismissAll();
        this.commonServices.presentToast("Data update successfully", null, "success");
        this.nav.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));
      }, error => {
        console.log("Error: ", error);
        this.commonServices.onDismissAll();
      });
    } else {
      this.commonServices.onDismissAll();
    }
  }
  prepareData(profile: Profile): any {

    let data = {
      id: profile.id,
      module: profile.module,
      name: profile.name,
      bloodGroup: profile.bloodGroup,
      gender: profile.gender,
      dob: '',
      mobile: profile.mobile,
      email: profile.email,
      adharNumber: profile.adharNumber,
      address1: profile.address1,
      address2: profile.address2,
      city: profile.city,
      state: profile.state,
      pinCode: profile.pinCode,
      inTime: profile.inTime,
      outTime: profile.outTime,
      identificationMarks: profile.identificationMarks,
      nationality: profile.nationality,
      religion: profile.religion,
      motherTongue: profile.motherTongue,
      annualIncome: profile.annualIncome,
      occupation: profile.occupation,
      picture: '',
    }
    if (profile.dob) {
      data.dob = moment(profile.dob).format("YYYY-MM-DD")
    }

    return data;
  }

  onClickPicture() {

    console.log("onClickPicture.....!", this.cameraOptions);


    let actionSheet = this.actionSheetCtrl.create({
      title: 'Save Image from',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA
            this.setProfilePicture(this.cameraOptions);
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
            this.setProfilePicture(this.cameraOptions);
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
  setProfilePicture(cameraOptions: CameraOptions) {
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.fileService.uploadFile(this.picture).subscribe(data => {
        if (data) {
          //this.imageId
        }
      }, error => {
        this.commonServices.presentToast(error, null, "error")
      });
    }, (error) => {
      this.commonServices.showAlert('Error', error.message, 'CLOSE');
    });
  }
}
