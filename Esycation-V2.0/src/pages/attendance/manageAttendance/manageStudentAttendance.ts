import { Component,OnInit,ViewChild  } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
//import {AttendanceComponent} from '../../attendances/attendance/attendance.componet';
//import {AttendanceService} from '../../../shared/services/attendance/attendance.service';
//import {CommonServices} from '../../../shared/services/common/common.service';
//import {UserPrefernce} from '../../../shared/models/baseModel/BaseModels';

@Component({
  selector: 'page-manage-attendance',
  templateUrl: 'manageStudentAttendance.html'
})

export class ManageAttendanceComponent {

  
  loading: Loading;
  //userPrefernce:UserPrefernce;
  batches:any;
  constructor( 
    private navCtrl: NavController,
    private loadingCtrl:LoadingController,
    //private attendanceService:AttendanceService,
   // private commonServices:CommonServices
  ) {
     // this.userPrefernce=this.commonServices.currentUser();
    }

    ionViewDidLoad(){

      /*
      console.log("UserPrefernce====",this.userPrefernce);
      this.loading = this.loadingCtrl.create({content: 'Loading....'}); this.loading.present();
      this.attendanceService.findBatchByRemoteId(this.userPrefernce.remoteId).subscribe(
        data=>{
          this.batches = data.contents;
          this.loading.dismissAll();
            console.log(this.batches); 
        },error=>{
          this.loading.dismissAll();
        });
        */
    }

    /*
    onAttendanceMark(batchId:number,courseId:number){
      this.navCtrl.push(AttendanceComponent,{batchId:batchId,courseId:courseId});
    }
    */

}
