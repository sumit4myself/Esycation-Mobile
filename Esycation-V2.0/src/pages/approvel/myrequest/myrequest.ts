import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from "../../baseComponent/base.component";
import { CommonServices } from "../../../providers/service/common/common.service";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { GuardianHistoryDetails } from '../../../providers/model/history/model.history.guardian';
import { StaffHistoryDetails } from '../../../providers/model/history/model.history.staff';
import { StudentHistoryDetails } from '../../../providers/model/history/model.history.student';
import {ServerConfig} from '../../../providers/config';

@IonicPage()
@Component({
  selector: "my-request",
  templateUrl: "myrequest.html"
})
export class MyRequestComponent extends BaseComponent {
  comment: string = null;
  leaveDetails: Object = null;
  profileDetails: Object = null;
  myRequestDetails: any = null;
  guardianHistoryDetails: GuardianHistoryDetails = null;
  staffHistoryDetails: StaffHistoryDetails = null;
  studentHistoryDetails: StudentHistoryDetails = null;
  imagePath:String=ServerConfig.imagePath();
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
          let history = new StaffHistoryDetails();
          history = Object.assign({}, data);
          this.staffHistoryDetails = history;

          console.log("this.staffHistoryDetails==",this.staffHistoryDetails);

        }
        else if (this.myRequestDetails.module == 'GUARDIAN') {
          let history = new GuardianHistoryDetails();
          history = Object.assign({}, data);
          this.guardianHistoryDetails = history;
        }
        else if (this.myRequestDetails.module == 'STUDENT') {
          let history = new StudentHistoryDetails();
          history = Object.assign({}, data);
          this.studentHistoryDetails = history;
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
      this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));
      this.commonServices.onDismissAll();
    }, error => {
      this.commonServices.onDismissAll();
      console.error("ERROR :", error);
    })
  }
}
