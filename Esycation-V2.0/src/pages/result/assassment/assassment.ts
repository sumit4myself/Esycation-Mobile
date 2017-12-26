import { Component } from '@angular/core';
import {IonicPage, Loading,NavParams,NavController} from 'ionic-angular';
import {FormGroup} from '@angular/forms';
import {UserSessionService} from "../../../providers/service/core/user.session.service";
import {BaseComponent} from '../../baseComponent/base.component';

import {AssessmentService} from '../../../providers/service/assessment/assessment.service';
import {StudentAssessmentDetails} from '../../../providers/model/assessment/model.assessmentDetails';
import {ServerConfig} from '../../../providers/config';

@IonicPage()
@Component({
  selector: 'assassment-page',
  templateUrl: 'assassment.html'
})
export class AssassmentComponent extends BaseComponent{

 imagePath:String=ServerConfig.imagePath();
 leaveForm: FormGroup;
 loading: Loading;

 studentAssessment:StudentAssessmentDetails=new StudentAssessmentDetails();

 constructor(
  protected navCtrl: NavController,
   private navParams:NavParams,
   private session:UserSessionService,
   private assessmentService:AssessmentService ) {
     super(session,navCtrl);
      console.log("session==",this.session,this.navParams,this.assessmentService);
    }

    ionViewDidLoad(){
      let id= this.navParams.get("id")
      console.log("Result Id==",id)

      /*
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
    */
    let d = Object.assign({},this.findData());
    this.studentAssessment=d;

    console.log("data=$$=",JSON.stringify(this.studentAssessment));
 }

  onPublish(){

    console.log("Onsave==",JSON.stringify(this.studentAssessment));
    this.assessmentService.publishAssessment(this.studentAssessment).subscribe(data=>{
      console.log("data==",data);
    });
  }
  
  onDraft(){
    console.log("onDraft==",JSON.stringify(this.studentAssessment));
    
   this.assessmentService.draftAssessment(this.studentAssessment).subscribe(data=>{
     console.log("data==",data);
   });
    
  }

  findData():any{

    let studentAssessmentDetail = {
      "id": 14,
      "assassmentDate": "25/12/2017",
      "courseId": 1,
      "courseName": "Course 24611",
      "courseCode": "Course 24611",
      "batchId": 2,
      "batchName": "Batch 65613",
      "batchCode": "Batch 65613",
      "subjectId": 2,
      "subjectName": "Subejct 24387",
      "subjectCode": "Sub_24387",
      "studentAssessements": [
          {
              "studentId": 2,
              "studentName": "Student 68686",
              "studentRollNumber": 14327,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": [{
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1.1",
                      "childs": []
                  }]
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 10,
              "studentName": "Student 34435",
              "studentRollNumber": 17070,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 18,
              "studentName": "Student 73769",
              "studentRollNumber": 20692,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 12,
              "studentName": "Student 27315",
              "studentRollNumber": 39354,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 20,
              "studentName": "Student 93472",
              "studentRollNumber": 47207,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 14,
              "studentName": "Student 55151",
              "studentRollNumber": 47930,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 4,
              "studentName": "Student 29927",
              "studentRollNumber": 49302,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 6,
              "studentName": "Student 77848",
              "studentRollNumber": 50327,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 16,
              "studentName": "Student 88951",
              "studentRollNumber": 59905,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          },
          {
              "studentId": 8,
              "studentName": "Student 64061",
              "studentRollNumber": 87622,
              "assessements": [
                  {
                      "assessmentConfigurationId": 8,
                      "rating": 0,
                      "name": "Level 1.1",
                      "childs": []
                  },
                  {
                      "assessmentConfigurationId": 9,
                      "rating": 0,
                      "name": "Level 1.2",
                      "childs": []
                  }
              ]
          }
      ]
  }
    return studentAssessmentDetail;
  }



}