import { Component } from '@angular/core';
import { IonicPage, Loading, Nav, NavController } from 'ionic-angular';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';
import { AssessmentService } from '../../../providers/service/assessment/assessment.service';
import { StudentAssessmentDetails } from '../../../providers/model/assessment/model.assessment';
import { ManageAssessment } from '../../../providers/model/assessment/model.manage.assessment';

@IonicPage()
@Component({
  selector: 'assassment-view-page',
  templateUrl: 'assassmentView.html'
})
export class AssassmentViewComponent extends BaseComponent {

  loading: Loading;
  viewMode: string;
  dataNotfound:string=null;
  manageAssessments: Array<ManageAssessment> = new Array<ManageAssessment>();
  completedAssessments: Array<ManageAssessment> = new Array<ManageAssessment>();
  constructor(
    protected navCtrl: NavController,
    private nav: Nav,
    private session: UserSessionService,
    private assessmentService: AssessmentService) {
    super(session, navCtrl);
    
    this.viewMode="first";
  }

  ionViewDidLoad() {
    
    this.assessmentService.findPendingStudentAssessment(this.session.findRemote()).subscribe(data => {
      this.convertToFlatData(data.contents);
    });

    this.assessmentService.findCompletedStudentAssessment(this.session.findRemote()).subscribe(data => {
     
      this.platDataCompletedAssessments(data.contents);
      if(this.completedAssessments.length==0){
        this.dataNotfound="No not found.";
      }
     console.log("platDataCompletedAssessments===", this.completedAssessments);
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

    console.log(JSON.stringify(studentAssessmentDetail[0]));

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
    
        let studentAssessmentDetail = new StudentAssessmentDetails();
        studentAssessmentDetail = Object.assign(studentAssessmentDetail, data);
        if(studentAssessmentDetail.id!=null){
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
