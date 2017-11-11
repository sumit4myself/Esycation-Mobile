import { Component } from '@angular/core';
import { IonicPage,Nav,Events } from 'ionic-angular';
import {AuthService} from '../../../providers/service/core/auth.service';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
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
    private nav:Nav){ 
       
      this.authService.logOut(this.session.findUserId()).subscribe(isActiveUser=>{
      
        console.log("##############Auth==",isActiveUser);
        
        if(isActiveUser){
          this.events.publish('LOGIN_USER_EVENT');
          this.nav.setRoot('HomeComponent');
        }
        else{
          this.nav.setRoot('LoginComponent');
        }
      });
           
    }

}


