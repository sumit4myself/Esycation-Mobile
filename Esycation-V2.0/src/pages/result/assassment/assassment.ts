import { Component } from '@angular/core';
import {IonicPage, Loading,NavParams,NavController} from 'ionic-angular';
import {FormGroup} from '@angular/forms';
import {UserSessionService} from "../../../providers/service/core/user.session.service";
import {BaseComponent} from '../../baseComponent/base.component';
import {AttendanceService} from '../../../providers/service/attendance/attendance.service';

import { AttendanceModel,Attendance} from '../../../providers/model/attendance/model.attendance';
import {PagedResponse} from '../../../providers/model/common/PaggedResponse';

import {ResultDetails} from '../../../providers/model/result/model.result.entry';
import {AssessmentService} from '../../../providers/service/assessment/assessment.service';

@IonicPage()
@Component({
  selector: 'assassment-page',
  templateUrl: 'assassment.html'
})
export class AssassmentComponent extends BaseComponent{

 leaveForm: FormGroup;
 loading: Loading;
 counter : number =0;
 offset : number=50;
 mode:string="create";
 rate: any = 1;
 resultDetails:ResultDetails
 pagedResponse:PagedResponse;
 student:AttendanceModel
 attendance:Attendance=new Attendance();
 students:Array<AttendanceModel>=new Array<AttendanceModel>();

 constructor(
  protected navCtrl: NavController,
   private navParams:NavParams,
   private session:UserSessionService,
   private assessmentService:AssessmentService,
   private attendanceService:AttendanceService ) {
     super(session,navCtrl);
      console.log("session==",this.session,this.navParams,this.assessmentService);
    }

    ionViewDidLoad(){
      let id= this.navParams.get("id")
      console.log("Result Id==",id)

      this.attendanceService.findStudentByBatchId(4).subscribe(data=>{
        this.pagedResponse = data;
        for(let studentDetails of this.pagedResponse.contents){
          this.student = new AttendanceModel();
          let d = Object.assign(this.student, studentDetails);
          this.student.studentId = studentDetails.id;
          this.student.id=null;
          this.students.push(d);
        }

        console.log("this.students===",this.students);
    });
 }

  onSave(){

    /*
    this.resultEntryService.draft(this.resultDetails).subscribe(data=>{
      console.log(data);
      this.navCtrl.setRoot("ResultEntiryViewComponent"); 
    });

    */
  }
  
  onUpdate(){

    /*
    this.resultEntryService.publish(this.resultDetails).subscribe(data=>{
      console.log(data);
      this.navCtrl.setRoot("ResultEntiryViewComponent"); 
    });

    */
  }

  onModelChange(){

    console.log(" rate==",this.rate);

  }

}