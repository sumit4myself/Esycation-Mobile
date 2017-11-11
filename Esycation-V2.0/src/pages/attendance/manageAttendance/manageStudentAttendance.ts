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
          if(this.batches){
            for(let batch of this.batches){
             
              this.attendanceService.findTodayAttendance(batch.id).subscribe(todayAttendances=>{
                  if(todayAttendances.id){
                    batch.ismarkedAttendance=true;
                  }
                  else{
                    batch.ismarkedAttendance=false;
                  }
              }) 
            }
          }
          this.loading.dismissAll();
          console.log(this.batches);

        },error=>{
          console.log(error);
          this.loading.dismissAll();
        });
        
    }

    
    onAttendanceMark(batchId:number,courseId:number){
      this.navCtrl.push("StudentAttendanceComponent",{batchId:batchId,courseId:courseId});
    }
  

}
