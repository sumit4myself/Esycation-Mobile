import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';

import { ResultDetails } from '../../../providers/model/result/model.resultDetails';
import { ResultEntryService } from '../../../providers/service/resultEntry/result.entry.service';
import { ServerConfig } from '../../../providers/config';
import { CommonServices } from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'result-entry-page',
  templateUrl: 'resultEntry.html'
})
export class ResultEntiryComponent extends BaseComponent {


  imagePath: String = ServerConfig.imagePath();
  resultDetails: ResultDetails = new ResultDetails();

  constructor(
    protected navCtrl: NavController,
    private navParams: NavParams,
    private session: UserSessionService,
    private resultEntryService: ResultEntryService,
    private commonServices: CommonServices) {
    super(session, navCtrl);
    console.log("session==", this.session);
  }

  ionViewDidLoad() {

    this.commonServices.onLoader();
    let id = this.navParams.get("id")
    //console.log("Result Id==", id);
    this.resultEntryService.findByBatchResultId(id).subscribe(data => {
      this.commonServices.onDismissAll();
      let d = Object.assign({}, data);
      this.resultDetails = d;
      //console.log("resultDetails==", JSON.stringify(this.resultDetails));
    }, error => {
      console.error(error);
      this.commonServices.onDismissAll();
    });


  }

  onDraft() {

    if (this.validateMarks(this.resultDetails)) {
      this.commonServices.onLoader();
      this.resultDetails.resultStatus = "DRAFT";
      console.log("Result onDraft===", JSON.stringify(this.resultDetails));
      this.resultEntryService.draft(this.resultDetails).subscribe(data => {
        console.log(data);
        this.commonServices.onDismissAll();
        this.commonServices.presentToast("Result draft successfully", null, "success");
        this.navCtrl.setRoot("ResultEntiryViewComponent");
      }, error => {
        console.error(error);
        this.commonServices.onDismissAll();
      });
    }
  }

  onPublish() {

    if (this.validateMarks(this.resultDetails)) {
      this.commonServices.onLoader();
      this.resultDetails.resultStatus = "PUBLISHED";
      console.log("Result Pubblish===", JSON.stringify(this.resultDetails));
      this.resultEntryService.publish(this.resultDetails).subscribe(data => {
        console.log(data);
        this.commonServices.onDismissAll();
        this.commonServices.presentToast("Result publish successfully", null, "success");
        this.navCtrl.setRoot("ResultEntiryViewComponent");
      }, error => {
        console.error(error);
        this.commonServices.onDismissAll();
      });
    }

  }

  onMarksValidate(marks: number, indexNo: number) {
    if (marks > this.resultDetails.marks) {
      this.resultDetails.studentResults[indexNo].error = "you can not enter marks out of " + this.resultDetails.marks;
    } else {
      this.resultDetails.studentResults[indexNo].error = null;
    }
  }

  public validateMarks(resultDetails: ResultDetails): boolean {
    let isValidate = true;
    for (let studentResult of resultDetails.studentResults) {
      if (studentResult.error) {
        isValidate = false;
        break;
      }
    }
    return isValidate;
  }


}