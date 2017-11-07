import { Component  } from '@angular/core';
import { NavController, IonicPage,LoadingController, Loading } from 'ionic-angular';
//import {StudentAttendanceComponent} from '../../attendance/studentAttendance/studentAttendance';
import {AttendanceService} from '../../../providers/service/attendance/attendance.service';
import {UserSessionService} from '../../../providers/service/core/user.session.service';

@IonicPage()
@Component({
  selector: 'manageAttendance-page',
  templateUrl: 'manageStudentAttendance.html'
})

export class ManageAttendanceComponent {

  
  loading: Loading;
  batches:any;
  constructor( 
    private navCtrl: NavController,
    private loadingCtrl:LoadingController,
    private attendanceService:AttendanceService,
   private session:UserSessionService) { }

    ionViewDidLoad(){

      this.loading = this.loadingCtrl.create({content: 'Loading....'}); this.loading.present();
      this.attendanceService.findBatchByRemoteId(this.session.findRemote()).subscribe(
        data=>{
          this.batches = data.contents;
          this.loading.dismissAll();
        },error=>{
          console.log(error);
          this.loading.dismissAll();
        });
        
    }

    
    onAttendanceMark(batchId:number,courseId:number){
      this.navCtrl.push("StudentAttendanceComponent",{batchId:batchId,courseId:courseId});
    }
  

}
