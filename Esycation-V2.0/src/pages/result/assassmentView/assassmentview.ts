import { Component } from '@angular/core';
import {IonicPage, Loading,Nav,NavController} from 'ionic-angular';
import {FormGroup} from '@angular/forms';
import {UserSessionService} from "../../../providers/service/core/user.session.service";
import {BaseComponent} from '../../baseComponent/base.component';

@IonicPage()
@Component({
  selector: 'assassment-view-page',
  templateUrl: 'assassmentView.html'
})
export class AssassmentViewComponent extends BaseComponent {

 leaveForm: FormGroup;
 loading: Loading;
 constructor(
  protected navCtrl: NavController,
   private nav:Nav,
   private session:UserSessionService) {
      super(session,navCtrl);
      console.log("session==",this.session);
    }

    onResult(id:number){

       this.nav.push("AssassmentComponent",{id:id});

    }
 
}