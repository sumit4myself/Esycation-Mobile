declare var Object: any;

import { Component,ViewChild  } from '@angular/core';
import { NavController,NavParams, LoadingController, Loading } from 'ionic-angular';
import { Content } from 'ionic-angular';
import {AttendanceService} from '../../../shared/services/attendance/attendance.service';
import { AttendanceModel,StudentAttendanceDetails,StudentAttendance} from '../../../shared/models/attendance/model.attendance';
import {CommonServices} from "../../../shared/services/common/common.service";
import {ManageAttendanceComponent} from '../manage-attendance/manage.attendance.componet';

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})

export class AttendanceComponent  {
@ViewChild(Content) content: Content;
  
  loading: Loading;
  student:AttendanceModel
  counter : number =0;
  offset : number=50;
  courseId:number=1;
  batchId:number=null;
  attendanceId:number=null;
  students:Array<AttendanceModel>=new Array<AttendanceModel>();

  constructor( 
    private navCtrl: NavController,
    private navParam:NavParams,
    private attendanceService:AttendanceService,
    private loadingCtrl:LoadingController,
    private commonServices:CommonServices) {}

 
  ionViewDidLoad(){
    this.batchId = this.navParam.get("batchId");
    this.loading = this.loadingCtrl.create({
        content: 'Loading..'
      }); this.loading.present();
      this.attendanceService.findStudentByBatchId(this.batchId).subscribe(data=>{
        
        for(let studentDetails of data.contents){
          this.student = new AttendanceModel();
          let d = Object.assign(this.student, studentDetails);
          this.students.push(d);
        }
        //console.log(JSON.stringify(this.students));

       this.attendanceService.findById(this.batchId).subscribe(data=>{
          console.log("save==",data);
        }) 

      });

    

      

     this.loading.dismissAll();
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
    this.attendanceService.save(studentAttendanceDetails).subscribe(
      data=>{
        this.loading.dismissAll();
        this.navCtrl.setRoot(ManageAttendanceComponent);
      },error=>{
        this.commonServices.presentToast("Error :");
        this.loading.dismissAll();
      });

    //console.log("onSave students :",studentAttendanceDetails);

  }

  onUpdate(){
   
    let studentAttendanceDetails = this.prepareDataSet();
    studentAttendanceDetails.id = this.attendanceId;
    this.loading = this.loadingCtrl.create({content: 'Updating....'});
    this.loading.present();
    this.attendanceService.update(this.attendanceId,studentAttendanceDetails).subscribe(
      data=>{
        this.loading.dismissAll();
        this.navCtrl.setRoot(ManageAttendanceComponent);
      },error=>{
        this.commonServices.presentToast("Error :");
        this.loading.dismissAll();
      });
   // console.log("onUpdate students :",studentAttendanceDetails);
  }

 private prepareDataSet(studentAttendanceDetails:
    StudentAttendanceDetails=new StudentAttendanceDetails())
    :StudentAttendanceDetails{

    let studentAttendances  = new Array<StudentAttendance>();
    for(let student of this.students){

      let attendance = new StudentAttendance();
      attendance.studentId = student.id;
      attendance.present = student.present;
      studentAttendances.push(attendance);
    }
    studentAttendanceDetails.batchId = this.batchId;
    studentAttendanceDetails.courseId = this.courseId;
    studentAttendanceDetails.attenderId = this.commonServices.findCurrentUserId();
    studentAttendanceDetails.studentAttendances = studentAttendances;

    return studentAttendanceDetails;
  }


}
