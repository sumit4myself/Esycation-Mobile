import { Component  } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {AttendanceService} from '../../../providers/service/attendance/attendance.service';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {BaseComponent} from '../../baseComponent/base.component';
import {CommonServices} from '../../../providers/service/common/common.service';


@IonicPage()
@Component({
  selector: 'manageAttendance-page',
  templateUrl: 'manageStudentAttendance.html'
})

export class ManageAttendanceComponent extends BaseComponent{

  batches:any;
  constructor( 
    protected navCtrl: NavController,
    private attendanceService:AttendanceService,
    protected session:UserSessionService,
    private commonServices:CommonServices) { 

    super(session,navCtrl);
   }

    ionViewDidLoad(){

      this.commonServices.onLoader();
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
          this.commonServices.onDismissAll();
          console.log(this.batches);

        },error=>{
          console.log(error);
          this.commonServices.onDismissAll();
        });
        
    }

    
    onAttendanceMark(batchId:number,courseId:number){
      this.navCtrl.push("StudentAttendanceComponent",{batchId:batchId,courseId:courseId});
    }
  

}
