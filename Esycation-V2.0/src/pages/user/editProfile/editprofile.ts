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
 constructor(
    private formBuilder:FormBuilder,
    private loadingCtrl:LoadingController,
    private nav:Nav,
    private session:UserSessionService,
    private profileService:ProfileService) {

      this.segmentView="one";
      this.buildForm();
    }
 
   

    buildForm(){

      this.profileForm = this.formBuilder.group({
        id: ['', [<any>Validators.required]],
        name: ['', [<any>Validators.required]],
        bloodGroup: ['', [<any>Validators.required]],
        gender: ['',[<any>Validators.required]],
        dob: ['',[<any>Validators.required]],
        mobile: ['',[<any>Validators.required]],
        email:['',[<any>Validators.required]],
        adharNumber:['',[<any>Validators.required]],
        address1:['',[<any>Validators.required]],
        address2:['',[<any>Validators.required]],
        city:['',[<any>Validators.required]],
        state:['',[<any>Validators.required]],
        pinCode:['',[<any>Validators.required]],
        inTime:['',[<any>Validators.required]],
        outTime:['',[<any>Validators.required]],
        module:['',[<any>Validators.required]],
      });
     
      this.profileService.findProfileDetails(this.session.findRemote(),this.session.findModule())
      .subscribe(data=>{
         this.profile = Object.assign(this.profile, data);
         this.profileForm.setValue(this.prepareData(this.profile));
      });      
    }

  onUpdate({value,valid}:{value:ProfileInterface,valid:boolean}){

      value.dob=moment(value.dob).format("MM/DD/YYYY");
      console.log("Edit Profile==",JSON.stringify(value),valid);

      this.loading= this.loadingCtrl.create({content:'Updating..'});
      this.loading.present();
      this.profileService.editProfile(value).subscribe(data=>{
        console.log(data);
        this.loading.dismissAll();
        this.nav.setRoot("HomeComponent");
      });
    
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
      }
     
      return data;
  }
    
}
