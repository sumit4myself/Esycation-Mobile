import { Component } from '@angular/core';
import { IonicPage, Loading, NavParams, NavController } from 'ionic-angular';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';

import { ResultDetails } from '../../../providers/model/result/model.resultDetails';
import { ResultEntryService } from '../../../providers/service/resultEntry/result.entry.service';
import { ServerConfig } from '../../../providers/config';

@IonicPage()
@Component({
  selector: 'result-entry-page',
  templateUrl: 'resultEntry.html'
})
export class ResultEntiryComponent extends BaseComponent {

  loading: Loading;
  imagePath: String = ServerConfig.imagePath();
  resultDetails: ResultDetails = new ResultDetails();

  constructor(
    protected navCtrl: NavController,
    private navParams: NavParams,
    private session: UserSessionService,
    private resultEntryService: ResultEntryService) {
    super(session, navCtrl);
    console.log("session==", this.session);
  }

  ionViewDidLoad() {
    let id = this.navParams.get("id")
    console.log("Result Id==", id);
    this.resultEntryService.findByBatchResultId(id).subscribe(data=>{
      let d = Object.assign({}, data);
      this.resultDetails = d;
      console.log("resultDetails==",JSON.stringify(this.resultDetails));
    });
   

  }

  onDraft() {

    this.resultDetails.resultStatus = "DRAFT";
    console.log("Result onDraft===", JSON.stringify(this.resultDetails));
    this.resultEntryService.draft(this.resultDetails).subscribe(data => {
      console.log(data);
      this.navCtrl.setRoot("ResultEntiryViewComponent");
    });
    
  }

  onPublish() {

    this.resultDetails.resultStatus = "PUBLISH";
    console.log("Result Pubblish===", JSON.stringify(this.resultDetails));
    this.resultEntryService.publish(this.resultDetails).subscribe(data => {
      console.log(data);
      this.navCtrl.setRoot("ResultEntiryViewComponent");
    });
  }

}