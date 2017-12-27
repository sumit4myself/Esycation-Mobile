import { Component } from '@angular/core';
import {IonicPage, Loading,NavParams,NavController} from 'ionic-angular';
import {FormGroup} from '@angular/forms';
import {UserSessionService} from "../../../providers/service/core/user.session.service";
import {BaseComponent} from '../../baseComponent/base.component';

import {ResultDetails} from '../../../providers/model/result/model.resultDetails';
import {ResultEntryService} from '../../../providers/service/resultEntry/result.entry.service';
import {ServerConfig} from '../../../providers/config';

@IonicPage()
@Component({
  selector: 'result-entry-page',
  templateUrl: 'resultEntry.html'
})
export class ResultEntiryComponent extends BaseComponent{

 leaveForm: FormGroup;
 loading: Loading;
 counter : number =0;
 offset : number=50;
 mode:string="create";
 imagePath:String=ServerConfig.imagePath();
 resultDetails:ResultDetails= new ResultDetails();

 
 constructor(
  protected navCtrl: NavController,
   private navParams:NavParams,
   private session:UserSessionService,
   private resultEntryService:ResultEntryService ) {
     super(session,navCtrl);
      console.log("session==",this.session,this.navParams,this.resultEntryService);
    }

    ionViewDidLoad(){
      let id= this.navParams.get("id")
      console.log("Result Id==",id);

     let d = Object.assign({},this.findData());
     this.resultDetails=d;
    console.log("data=$$=",JSON.stringify(this.resultDetails));

 }

  onDraft(){


    console.log("resultDetails===",JSON.stringify(this.resultDetails));
    /*
    this.resultEntryService.draft(this.resultDetails).subscribe(data=>{
      console.log(data);
      this.navCtrl.setRoot("ResultEntiryViewComponent"); 
    });

    */
  }
  
  onPublish(){

    /*
    this.resultEntryService.publish(this.resultDetails).subscribe(data=>{
      console.log(data);
      this.navCtrl.setRoot("ResultEntiryViewComponent"); 
    });

    */
  }

  findData():any{

    let data={
      "id": 14,
      "examDate": "25/12/2017",
	  "resultDate": "25/12/2017",
      "courseId": 1,
      "courseName": "Course 24611",
      "courseCode": "Course 24611",
      "batchId": 2,
      "batchName": "Batch 65613",
      "batchCode": "Batch 65613",
      "subjectId": 2,
      "subjectName": "Subejct 24387",
      "subjectCode": "Sub_24387",
      "studentResults": [
          {
              "studentId": 1,
              "studentName": "Student 6868",
              "studentRollNumber": 111,
			  "studentImageId": null,
			  "marks": null,
			},
			{
              "studentId": 2,
              "studentName": "Student 777",
              "studentRollNumber": 222,
			  "studentImageId": null,
			  "marks": null,
			},{
              "studentId": 3,
              "studentName": "Student 888",
              "studentRollNumber": 33,
			  "studentImageId": 1,
			  "marks": null,
			},{
        "studentId": 3,
        "studentName": "Student 888",
        "studentRollNumber": 33,
  "studentImageId": 1,
  "marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
,{
  "studentId": 3,
  "studentName": "Student 888",
  "studentRollNumber": 33,
"studentImageId": 1,
"marks": null,
}
			]
  };
 
    return data;
  }

}