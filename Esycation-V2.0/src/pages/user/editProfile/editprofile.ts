import { Component } from '@angular/core';
import {IonicPage,LoadingController,Loading,Nav} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {UserSessionService} from "../../../providers/service/core/user.session.service";
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {Profile,ProfileInterface} from '../../../providers/model/profile/model.profile';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'edit-profile-page',
  templateUrl: 'editprofile.html'
})
export class EditProfileComponent {

 profileForm: FormGroup;
 loading: Loading;
 profile:Profile=Profile.getInstance();
 segmentView:string;
 moduleType:String;
 imageId:string=null;
 constructor(
    private formBuilder:FormBuilder,
    private loadingCtrl:LoadingController,
    private nav:Nav,
    private session:UserSessionService,
    private profileService:ProfileService) {

      this.buildForm();
      this.segmentView="one";
      this.moduleType = this.session.findModule();
      
    }

    buildForm(){

      this.profileForm = this.formBuilder.group({
        id: ['', [<any>Validators.required]],
        name: ['', [<any>Validators.required]],
        bloodGroup: ['', [<any>Validators.required]],
        gender: ['',[<any>Validators.required]],
        dob: ['',[<any>Validators.required]],
        mobile: ['',[<any>Validators.required,Validators.maxLength(10)]],
        email:['',[<any>Validators.required]],
        adharNumber:'',
        address1:['',[<any>Validators.required]],
        address2:'',
        city:['',[<any>Validators.required]],
        state:['',[<any>Validators.required]],
        pinCode:['',[<any>Validators.required]],
        inTime:'',
        outTime:'',
        module:['',[<any>Validators.required]],
        identificationMarks:'',
        nationality:'',
        religion:'',
        motherTongue:'',
        annualIncome:'',
        occupation:'',
      });
     
      this.profileService.findProfileDetails(this.session.findRemote(),this.session.findModule())
      .subscribe(data=>{
         this.profile = Object.assign(this.profile, data);
         this.profileForm.setValue(this.prepareData(this.profile));
         this.imageId = this.profile.imageId;
      });      
    }

  onUpdate({value,valid}:{value:ProfileInterface,valid:boolean}){

      value.dob=moment(value.dob).format("MM/DD/YYYY");
      console.log("Edit Profile==",JSON.stringify(value),valid);

      this.loading= this.loadingCtrl.create({content:'Updating..'});
      this.loading.present();
      if(valid){
        this.profileService.editProfile(value).subscribe(data=>{
          console.log(data);
          this.loading.dismissAll();
          this.nav.setRoot("HomeComponent");
        });
      }else{
        this.loading.dismiss();
        this.loading.dismissAll();
      }
  }
  prepareData(profile:Profile):any{
 
      let data={
        id:profile.id,
        module:profile.module,
        name:profile.name,
        bloodGroup: profile.bloodGroup,
        gender: profile.gender,
        dob: profile.dob,
        mobile: profile.mobile,
        email:profile.email,
        adharNumber:profile.adharNumber,
        address1:profile.address1,
        address2:profile.address2,
        city:profile.city,
        state:profile.state,
        pinCode:profile.pinCode,
        inTime:profile.inTime,
        outTime:profile.outTime,
        identificationMarks:profile.identificationMarks,
        nationality:profile.nationality,
        religion:profile.religion,
        motherTongue:profile.motherTongue,
        annualIncome:profile.annualIncome,
        occupation:profile.occupation,
      }
     
      return data;
  }
    
}
