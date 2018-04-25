import { Component } from "@angular/core";
import { IonicPage, Loading, NavParams, NavController } from "ionic-angular";
import { FormGroup } from "@angular/forms";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from "../../baseComponent/base.component";

import { AssessmentService } from "../../../providers/service/assessment/assessment.service";
import { StudentAssessmentDetails } from "../../../providers/model/assessment/model.assessmentDetails";
import { ServerConfig } from "../../../providers/config";
import { CommonServices } from "../../../providers/service/common/common.service";

@IonicPage()
@Component({
  selector: "view-assessment",
  templateUrl: "viewAssessment.html"
})
export class ViewAssessmentComponent extends BaseComponent {
  imagePath: String = ServerConfig.browseFilePath();
  leaveForm: FormGroup;
  loading: Loading;

  studentAssessment: StudentAssessmentDetails = new StudentAssessmentDetails();

  constructor(
    protected navCtrl: NavController,
    private navParams: NavParams,
    private session: UserSessionService,
    private assessmentService: AssessmentService,
    private commonServices: CommonServices
  ) {
    super(session, navCtrl);
    console.log("session==", this.session);
  }

  ionViewDidLoad() {
    this.commonServices.onLoader();
    let id = this.navParams.get("id");
    this.assessmentService.findByBatchAssessementId(id).subscribe(
      data => {
        this.commonServices.onDismissAll();
        let d = Object.assign({}, data);
        this.studentAssessment = d;
      },
      error => {
        console.error(error);
        this.commonServices.onDismissAll();
      }
    );
  }
}
