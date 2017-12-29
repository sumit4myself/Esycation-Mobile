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
      console.log("session==",this.session);
    }

    ionViewDidLoad(){
      let id= this.navParams.get("id")
      console.log("batchAssessementId==",id);

    this.assessmentService.findByBatchAssessementId(id).subscribe(data=>{
        let d = Object.assign({},data);
        this.studentAssessment=d;
    }) ; 
   // console.log("data=$$=",JSON.stringify(this.studentAssessment));
 }

  onPublish(){

    this.studentAssessment.resultStatus="PUBLISH";
    console.log("Onsave==",JSON.stringify(this.studentAssessment));

    this.assessmentService.publishAssessment(this.studentAssessment).subscribe(data=>{
      console.log("data==",data);
      this.navCtrl.setRoot("AssassmentViewComponent");
    });
  }
  
  onDraft(){
   this.studentAssessment.resultStatus="DRAFT";
   console.log("onDraft==",JSON.stringify(this.studentAssessment));
   this.assessmentService.draftAssessment(this.studentAssessment).subscribe(data=>{
     console.log("data==",data);
     this.navCtrl.setRoot("AssassmentViewComponent");
   });
    
  }


}