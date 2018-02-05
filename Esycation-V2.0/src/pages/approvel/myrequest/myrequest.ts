import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from "../../baseComponent/base.component";
import { CommonServices } from "../../../providers/service/common/common.service";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";

@IonicPage()
@Component({
  selector: "my-request",
  templateUrl: "myrequest.html"
})
export class MyRequestComponent extends BaseComponent {
  comment: string = null;
  leaveDetails: Object = null;
  profileDetails: Object = null;
  myRequestDetails: any;
  constructor(
    protected navCtrl: NavController,
    private session: UserSessionService,
    private commonServices: CommonServices,
    private approvalService: ApprovalService,
    private navParam: NavParams
  ) {
    super(session, navCtrl);

    console.log(this.session, this.approvalService, this.commonServices);
  }

  ionViewDidLoad() {

    this.myRequestDetails = this.navParam.get("myRequestDetails");

    console.log("myRequestDetails==", this.myRequestDetails);

    this.commonServices.onLoader();
    this.approvalService.findMyRequest(this.myRequestDetails).subscribe(
      data => {
        if (this.myRequestDetails.module == 'STAFF') {
          this.profileDetails = data;
        }
        else if (this.myRequestDetails.module == 'GUARDIAN') {
          this.profileDetails = data;
        }
        else if (this.myRequestDetails.module == 'STUDENT') {
          this.profileDetails = data;
        }
        else if (this.myRequestDetails.module == 'STAFF_LEAVE') {
          this.leaveDetails = data;
        }
        else if (this.myRequestDetails.module == 'STUDENT_LEAVE') {
          this.leaveDetails = data;
        }
        this.commonServices.onDismissAll();
      },
      error => {
        this.commonServices.onDismissAll();
        console.error("ERROR :", error);
      }
    );

  }

  onCancel() {

    this.commonServices.onLoader();
    this.approvalService.cancel(this.myRequestDetails.processInstanceId, this.comment).subscribe(data => {
      if (data) {
        console.info(data);
      }
      this.commonServices.onDismissAll();
    }, error => {
      this.commonServices.onDismissAll();
      console.error("ERROR :", error);
    })
  }
}
