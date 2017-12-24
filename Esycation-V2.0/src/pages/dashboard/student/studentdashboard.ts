import { Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {Profile} from '../../../providers/model/profile/model.profile';
import {ServerConfig} from '../../../providers/config'; 

@IonicPage()
@Component({
    selector: 'studentdashboard-page',
    templateUrl: 'studentdashboard.html'
})
export class StudentDashboardComponent {
   
    profile:Profile=Profile.getInstance()
    imagePath:String=ServerConfig.imagePath();
   
    constructor(private navContrle:NavController,
        private session:UserSessionService,
        private profileService:ProfileService )
        {
           console.log("StudentDashboardComponent.......!");
      }

    ionViewDidLoad(){
        this.profileService.findProfileDetails(this.session.findRemote(),this.session.findModule())
        .subscribe(data=>{
           this.profile = Object.assign(this.profile, data);
        });
    }

    onView(viewName:string){

        this.navContrle.setRoot(viewName);
   }

}


