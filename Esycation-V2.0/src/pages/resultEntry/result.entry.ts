import { Component } from '@angular/core';
import {IonicPage, Loading} from 'ionic-angular';
import {FormGroup} from '@angular/forms';
import {UserSessionService} from "../../providers/service/core/user.session.service";

@IonicPage()
@Component({
  selector: 'result-entry-page',
  templateUrl: 'result.entry.html'
})
export class ResultEntiryComponent {

 leaveForm: FormGroup;
 loading: Loading;
 constructor(
 //   private navCtrl: NavController,
   // private formBuilder:FormBuilder,
    //private leaveService:LeaveService,
    //private loadingCtrl:LoadingController,
   private session:UserSessionService) {

      console.log("session==",this.session);
    }
 
}
