import { Component } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';
import { AssessmentService } from '../../../providers/service/assessment/assessment.service';
import { StudentAssessmentDetails } from '../../../providers/model/assessment/model.assessment';
import { ManageAssessment } from '../../../providers/model/assessment/model.manage.assessment';
import {CommonServices} from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'assassment-view-page',
  templateUrl: 'assassmentView.html'
})
export class AssassmentViewComponent extends BaseComponent {

  viewMode: string;
  dataNotfound:string=null;
  assessmentEntryNotfound:string=null;
  manageAssessments: Array<ManageAssessment> = new Array<ManageAssessment>();
  completedAssessments: Array<ManageAssessment> = new Array<ManageAssessment>();
  constructor(
    protected navCtrl: NavController,
    private nav: Nav,
    private session: UserSessionService,
    private assessmentService: AssessmentService,
    private commonServices:CommonServices) {
    super(session, navCtrl);
    
    this.viewMode="first";
  }

  ionViewDidLoad() {
    
    this.commonServices.onLoader();
    this.assessmentService.findPendingStudentAssessment(this.session.findRemote()).subscribe(data => {
     
      this.commonServices.onDismissAll();
      if(data.contents.length==0){
       this.assessmentEntryNotfound="Data not found.";
      }else{
        this.convertToFlatData(data.contents);
      }
    },error=>{
      this.commonServices.onDismissAll();
         console.log(error);
     });
  
    this.assessmentService.findCompletedStudentAssessment(this.session.findRemote()).subscribe(data => {
      
      if(data.contents.length==0){
        this.dataNotfound="Data not found.";
      }
      else{
        this.platDataCompletedAssessments(data.contents);
      }
    });
  }

  onAssessment(id: number) {

    this.nav.push("AssassmentComponent", { id: id });

  }
   
  onViewAssessment(id:number){
   
    this.nav.push("ViewAssessmentComponent", { id: id });
  }

  convertToFlatData(data: any) {

    let studentAssessmentDetail = new StudentAssessmentDetails();
    studentAssessmentDetail = Object.assign(studentAssessmentDetail, data);

    for (let subjectAssessment of studentAssessmentDetail[0].subjectAssessements) {

      for (let batchAssessement of subjectAssessment.batchAssessements) {

         let assessment = new  ManageAssessment();
         assessment.assassmentDate=studentAssessmentDetail[0].assassmentDate;
         assessment.batchAssessementId=batchAssessement.id;
         assessment.batchName=batchAssessement.batchName;
         assessment.courseName=studentAssessmentDetail[0].assessmentConfigurationDetails.courseName;
         assessment.resultStatus=batchAssessement.resultStatus;
         assessment.subjectName = subjectAssessment.assessmentConfiguration.subjectName;
         this.manageAssessments.push(assessment);
      }

    }
  }

   platDataCompletedAssessments(data: any) {
    

        let d = new StudentAssessmentDetails();
       let studentAssessmentDetail = Object.assign(d, data);
        if(studentAssessmentDetail[0].id!=null){
          for (let subjectAssessment of studentAssessmentDetail[0].subjectAssessements) {
            
                  for (let batchAssessement of subjectAssessment.batchAssessements) {
            
                     let assessment = new  ManageAssessment();
                     assessment.assassmentDate=studentAssessmentDetail[0].assassmentDate;
                     assessment.batchAssessementId=batchAssessement.id;
                     assessment.batchName=batchAssessement.batchName;
                     assessment.courseName=studentAssessmentDetail[0].assessmentConfigurationDetails.courseName;
                     assessment.resultStatus=batchAssessement.resultStatus;
                     assessment.subjectName = subjectAssessment.assessmentConfiguration.subjectName;
                     this.completedAssessments.push(assessment);
                  }
            
                }
        }
    
    }

}
