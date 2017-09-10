import { Component,OnInit,ViewChild  } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import {AttendanceComponent} from '../../attendances/attendance/attendance.componet';

@Component({
  selector: 'page-manage-attendance',
  templateUrl: 'manage-attendance.html'
})

export class ManageAttendanceComponent {

  
  loading: Loading;
  constructor( 
    private navCtrl: NavController,
    private loadingContr:LoadingController) {

      
    }

    onAttendanceMark(id:number){
      this.navCtrl.push(AttendanceComponent,{batchId:id});
    }

}
