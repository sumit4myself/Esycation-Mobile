declare var Object: any;

import { Component,ViewChild  } from '@angular/core';
import { NavController,IonicPage,NavParams, LoadingController, Loading } from 'ionic-angular';
import { Content } from 'ionic-angular';
import {AttendanceService} from '../../../providers/service/attendance/attendance.service';
import { AttendanceModel,StudentAttendanceDetails,StudentAttendance,Attendance} from '../../../providers/model/attendance/model.attendance';
import {UserSessionService} from "../../../providers/service/core/user.session.service";
import {PagedResponse} from '../../../providers/model/common/PaggedResponse';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'studentAttendance.html'
})

export class StudentAttendanceComponent  {
@ViewChild(Content) content: Content;
  
  loading: Loading;
  counter : number =0;
  offset : number=50;
  mode:string="create";
  batchId:number=null
  courseId:number=null;
  pagedResponse:PagedResponse;
  student:AttendanceModel
  attendance:Attendance=new Attendance();
  students:Array<AttendanceModel>=new Array<AttendanceModel>();

  constructor( 
    private navCtrl: NavController,
    private navParam:NavParams,
    private attendanceService:AttendanceService,
    private loadingCtrl:LoadingController,
    private userSessionService:UserSessionService) {

      this.attendance.inTime= moment(new Date()).format('HH:mm:ss');
    }
 
  ionViewDidLoad(){
    this.batchId = this.navParam.get("batchId");
    this.courseId = this.navParam.get("courseId");
    this.attendance.batchId = this.batchId;
    this.attendance.courseId = this.courseId;
    this.loading = this.loadingCtrl.create({
        content: 'Loading..'
      }); this.loading.present();
      this.attendanceService.findStudentByBatchId(this.batchId).subscribe(data=>{
        this.pagedResponse = data;
        for(let studentDetails of this.pagedResponse.contents){
          this.student = new AttendanceModel();
          let d = Object.assign(this.student, studentDetails);
          this.student.studentId = studentDetails.id;
          this.student.id=null;
          this.students.push(d);
        }
       this.attendanceService.findTodayAttendance(this.batchId).subscribe(data=>{

          if(this.pagedResponse.contents[0].id){
            this.mode = "update";
            this.prepareUpdateData(data); 
          }
        }) 
        this.loading.dismissAll();
      },error=>{
        this.loading.dismissAll();
      });
    
  }

  onAbsent(){

    var obj:any 
    obj = this.students[this.counter];
    obj.present=false;
    obj.absent=true;
    this.counter++;
    this.onScroll();
  }

  onPresent(){
    var obj:any 
    obj = this.students[this.counter];
    obj.present=true;
    obj.absent=false
    this.counter++;
   this.onScroll();

  }
  
  onTouch(index){

    var obj:any 
    obj = this.students[index];
    if(!obj.present){
      obj.present=true;
      obj.absent=false;
    } 
    else{
      obj.present=false;
      obj.absent=true;
    }
    if(index==this.counter){
      this.counter++;
    }
  this.onScroll();
 }

  onScroll(){
    this.content.scrollTo(0, this.offset, 500);
    this.offset=this.offset+50;
  }
  
  onSave(){

    this.loading = this.loadingCtrl.create({
      content: 'saveing....'
    }); this.loading.present();
    let studentAttendanceDetails = this.prepareDataSet();
    this.attendanceService.saveAttendance(studentAttendanceDetails).subscribe(
      data=>{
        this.loading.dismissAll();
        this.navCtrl.setRoot("ManageAttendanceComponent");
      },error=>{
        this.loading.dismissAll();
      });
  }

  onUpdate(){
   
    let studentAttendanceDetails = this.prepareDataSet();
    this.loading = this.loadingCtrl.create({content: 'Updating....'});
    this.loading.present();
    this.attendanceService.updateAttendance(this.attendance.id,studentAttendanceDetails).subscribe(
      data=>{
        this.loading.dismissAll();
        this.navCtrl.setRoot("ManageAttendanceComponent");
      },error=>{
        this.loading.dismissAll();
      });
  }

 private prepareDataSet(studentAttendanceDetails:
    StudentAttendanceDetails=new StudentAttendanceDetails())
    :StudentAttendanceDetails{

    let studentAttendances  = new Array<StudentAttendance>();
    for(let student of this.students){

      let attendance = new StudentAttendance();
      attendance.id = student.id;
      attendance.studentId = student.studentId;
      attendance.present = student.present;
      studentAttendances.push(attendance);
    }
    studentAttendanceDetails.id = this.attendance.id;
    studentAttendanceDetails.batchId = this.attendance.batchId;
    studentAttendanceDetails.courseId = this.attendance.courseId;
    studentAttendanceDetails.inTime = this.attendance.inTime;
    studentAttendanceDetails.date = this.attendance.date;
    studentAttendanceDetails.createdBy = this.attendance.createdBy;
    studentAttendanceDetails.createdOn = this.attendance.createdOn;
    studentAttendanceDetails.attenderId = this.userSessionService.findUserId()
    studentAttendanceDetails.studentAttendances = studentAttendances;

    return studentAttendanceDetails;
  }

private prepareUpdateData(data:any){

      this.attendance.id = data.id;
      this.attendance.attendanceId = data.attenderId;
      this.attendance.courseId = data.courseId;
      this.attendance.inTime = data.inTime;
      this.attendance.date = data.date;
      this.attendance.createdOn = data.createdOn;
      this.attendance.createdBy = data.createdBy;

      for(let attendance of data.studentAttendances){
        let index=0;
        for(let student of this.students){
            if(attendance.studentId==student.studentId){

              this.students[index].id =attendance.id;
                if(attendance.present){
                  this.students[index].present=true;
                  this.students[index].absent=false;
                }
                else{
                  this.students[index].present=false;
                  this.students[index].absent=true; 
                }
              break;
            } 
            index++;
        }
      }
  }

}
