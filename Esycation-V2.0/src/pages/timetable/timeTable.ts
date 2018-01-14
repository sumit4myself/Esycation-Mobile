import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BaseComponent } from '../baseComponent/base.component';
import {UserSessionService} from "../../providers/service/core/user.session.service";
import { NavParams } from 'ionic-angular/navigation/nav-params';

@IonicPage()
@Component({
  selector: 'time-table-page',
  templateUrl: 'timeTable.html'
})
export class TimeTableComponent extends BaseComponent {

  ttt = {};
  timetable = {};
  constructor(
    protected navCtrl: NavController,
    public session: UserSessionService,
    public navParams: NavParams
    ) {
    super(session, navCtrl);
    if(navParams.get('timeTable')){
      this.timetable = navParams.get('timeTable');
      console.log(this.timetable);
    }
  }

  ionViewDidLoad() {
    // this.ttt = navParams.get('timeTable');
  
  }

  

}