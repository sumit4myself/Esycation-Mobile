import { Component } from '@angular/core';
import { IonicPage,Nav,Events } from 'ionic-angular';
import {AuthService} from '../../../providers/service/core/auth.service';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {CommonServices} from '../../../providers/service/common/common.service';
@IonicPage()
@Component({
  selector: 'logout-page',
  template: 'logout',
   
})
export class LogoutComponent {

  constructor(
    private events:Events,
    private authService:AuthService,
    private session:UserSessionService,
    private commonServices:CommonServices,
    private nav:Nav){ 

     let data={
        remoteId:this.session.findRemote(),
        module:this.session.findModule(),
        registrationId :localStorage.getItem("registrationId")
      };
      this.authService.logOut(this.session.findUserId()).subscribe(isActiveUser=>{
      
        console.log("##############Auth==",isActiveUser);  
        if(isActiveUser){
          this.events.publish('LOGIN_USER_EVENT');
          this.events.publish('user:loggedOut',data);
          this.commonServices.presentToast("Successfully logout",null,"success");
          this.nav.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));
          
        }
        else{
         // this.commonServices.showAlert("Logout",JSON.stringify(data));
          this.commonServices.presentToast("Successfully logout",null,"success");
          this.events.publish('user:loggedOut',data);
          this.nav.setRoot('LoginComponent');
        }
      });
           
    }

}


