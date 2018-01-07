import { Component } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';
import { ResultEntryService } from '../../../providers/service/resultEntry/result.entry.service';
import { ManageResult } from '../../../providers/model/result/model.manage.resultDetails';
import { ResultDetails } from '../../../providers/model/result/model.result.entry';
import {CommonServices} from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'result-entry-view-page',
  templateUrl: 'resultEntryView.html'
})
export class ResultEntiryViewComponent extends BaseComponent {

  pendingResults: Array<ManageResult> = new Array<ManageResult>();
  marksIntersResults: Array<ManageResult> = new Array<ManageResult>();
  viewMode:string=null;
  dataNotfound:string=null;
  resultEntryNotfound:string=null;
  constructor(
    protected navCtrl: NavController,
    private nav: Nav,
    private session: UserSessionService,
    private resultEntryService: ResultEntryService,
    private commonServices:CommonServices) {

    super(session, navCtrl);
    
  }

  ionViewDidLoad() {
    
    this.commonServices.onLoader();
    this.viewMode="first"
    this.resultEntryService.findPendingMarksEntry(this.session.findRemote()).subscribe(data => {

      this.commonServices.onDismissAll();  
      if(data.contents.length==0){
        this.resultEntryNotfound="Data not found.";
      }else{
        this.ploatPendingResultData(data.contents);
      }
    },error=>{
      this.commonServices.onDismissAll();
         console.log(error);
     });

    this.resultEntryService.findMarksEntry(this.session.findRemote()).subscribe(data=>{
        if(data.contents.length==0){
          this.dataNotfound="Data not found.";
        }
        else{
          this.ploatMarksEntryData(data.contents);
        }
    });
  
  }

  onResult(id: number) {

    this.nav.push("ResultEntiryComponent", { id: id });

  }

  onViewResult(id:number){

    this.nav.push("ViewResultComponent", { id: id });
  }

  ploatPendingResultData(data: any) {

    let resultDetail = new ResultDetails();
    resultDetail = Object.assign(resultDetail, data);
   // console.log("ploatPendingResultData==",JSON.stringify(resultDetail));
    if (resultDetail[0]) {
      let results = resultDetail[0];
      for (let result of results.subjectResults) {
        for (let batch of result.batchResults) {
          let pendingResult = new ManageResult();
          pendingResult.courseId = results.courseId;
          pendingResult.courseName = results.courseName;
          pendingResult.examDate = result.examDate;
          pendingResult.examName = results.exam.name;
          pendingResult.batchResultId = batch.id;
          pendingResult.batchName = batch.batchName;
          pendingResult.resultStatus = batch.resultStatus;
          pendingResult.subjectName = result.subjectName;
          this.pendingResults.push(pendingResult);
        }
      }
    }
  }

  ploatMarksEntryData(data: any) {

    let resultDetail = new ResultDetails();
    resultDetail = Object.assign(resultDetail, data);
    if (resultDetail[0]) {
      let results = resultDetail[0];
      for (let result of results.subjectResults) {
        for (let batch of result.batchResults) {
          let pendingResult = new ManageResult();
          pendingResult.courseId = results.courseId;
          pendingResult.courseName = results.courseName;
          pendingResult.examDate = result.examDate;
          pendingResult.examName = results.exam.name;
          pendingResult.batchResultId = batch.id;
          pendingResult.batchName = batch.batchName;
          pendingResult.resultStatus = batch.resultStatus;
          pendingResult.subjectName = result.subjectName;
          this.marksIntersResults.push(pendingResult);
        }
      }
    }

  }
}
