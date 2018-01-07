import { Component } from '@angular/core';
import { IonicPage, Loading, NavParams, NavController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';

import { ResultDetails } from '../../../providers/model/result/model.resultDetails';
import { ResultEntryService } from '../../../providers/service/resultEntry/result.entry.service';
import { ServerConfig } from '../../../providers/config';
import {CommonServices} from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'view-result',
  templateUrl: 'viewResult.html'
})
export class ViewResultComponent extends BaseComponent {

  leaveForm: FormGroup;
  loading: Loading;
  counter: number = 0;
  offset: number = 50;
  imagePath: String = ServerConfig.imagePath();
  resultDetails: ResultDetails = new ResultDetails();

  constructor(
    protected navCtrl: NavController,
    private navParams: NavParams,
    private session: UserSessionService,
    private resultEntryService: ResultEntryService,
    private commonServices:CommonServices ) {
    super(session, navCtrl);
    console.log("session==", this.session);
  }

  ionViewDidLoad() {
    let id = this.navParams.get("id")  
    this.commonServices.onLoader();
    this.resultEntryService.findByBatchResultId(id).subscribe(data=>{
      this.commonServices.onDismissAll();
      let d = Object.assign({}, data);
      this.resultDetails = d;
    },error=>{
            console.error(error);
            this.commonServices.onDismissAll();
       });  
  }


}