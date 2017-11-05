import { Component } from '@angular/core';
import { IonicPage,NavController,Nav } from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {Profile} from '../../../providers/model/profile/model.profile';
declare var Object: any;
@IonicPage()
@Component({
  selector: 'page-viewProfile',
  templateUrl: 'viewProfile.html'
})
export class ViewProfileComponent {
  
  profile:Profile=Profile.getInstance();
  constructor(
    private navCtrl: NavController,
    private session: UserSessionService,
    private nav:Nav,
    private ProfileService:ProfileService) {

    }

  ionViewDidLoad(){
    this.ProfileService.findProfileDetails(this.session.findRemote(),this.session.findModule())
    .subscribe(data=>{
       this.profile = Object.assign(this.profile, data);
    });
  }
  
  onEdit(){
    this.nav.push("EditProfileComponent");
  }
 
}
