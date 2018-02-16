import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';

import { AssessmentService } from '../../../providers/service/assessment/assessment.service';
import { StudentAssessmentDetails } from '../../../providers/model/assessment/model.assessmentDetails';
import { ServerConfig } from '../../../providers/config';
import { CommonServices } from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'assassment-page',
  templateUrl: 'assassment.html'
})
export class AssassmentComponent extends BaseComponent {

  imagePath: String = ServerConfig.imagePath();
  leaveForm: FormGroup;

  studentAssessment: StudentAssessmentDetails = new StudentAssessmentDetails();

  constructor(
    protected navCtrl: NavController,
    private navParams: NavParams,
    private session: UserSessionService,
    private assessmentService: AssessmentService,
    private commonServices: CommonServices) {
    super(session, navCtrl);
    console.log("session==", this.session);
  }

  ionViewDidLoad() {
    this.commonServices.onLoader();
    let id = this.navParams.get("id")
    this.assessmentService.findByBatchAssessementId(id).subscribe(data => {
      this.commonServices.onDismissAll();
      let d = Object.assign({}, data);
      this.studentAssessment = d;
    }, error => {
      console.error(error);
      this.commonServices.onDismissAll();
    });

  }

  onPublish() {

    this.commonServices.onLoader();
    this.studentAssessment.resultStatus = "PUBLISHED";
    console.log("Onsave==", JSON.stringify(this.studentAssessment));
    this.assessmentService.publishAssessment(this.studentAssessment).subscribe(data => {
      console.log("data==", data);
      this.commonServices.presentToast("Assessment publish successfully",null,"success");
      this.commonServices.onDismissAll();
      this.navCtrl.setRoot("AssassmentViewComponent");
    }, error => {
      console.error(error);
      this.commonServices.onDismissAll();
    });
  }

  onDraft() {
    this.commonServices.onLoader();
    this.studentAssessment.resultStatus = "DRAFT";
    console.log("onDraft==", JSON.stringify(this.studentAssessment));
    this.assessmentService.draftAssessment(this.studentAssessment).subscribe(data => {
      console.log("data==", data);
      this.commonServices.presentToast("Assessment draft successfully",null,"success");
      this.commonServices.onDismissAll();
      this.navCtrl.setRoot("AssassmentViewComponent");
    }, error => {
      console.error(error);
      this.commonServices.onDismissAll();
    });

  }

  
  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
    } else {
      data.showDetails = true;
    }
  }

}