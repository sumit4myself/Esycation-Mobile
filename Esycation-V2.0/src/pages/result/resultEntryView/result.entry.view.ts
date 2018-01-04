import { Component } from '@angular/core';
import { IonicPage, Loading, Nav, NavController } from 'ionic-angular';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';
import { ResultEntryService } from '../../../providers/service/resultEntry/result.entry.service';
import { ManageResult } from '../../../providers/model/result/model.manage.resultDetails';
import { ResultDetails } from '../../../providers/model/result/model.result.entry';

@IonicPage()
@Component({
  selector: 'result-entry-view-page',
  templateUrl: 'resultEntryView.html'
})
export class ResultEntiryViewComponent extends BaseComponent {

  loading: Loading;
  pendingResults: Array<ManageResult> = new Array<ManageResult>();
  marksIntersResults: Array<ManageResult> = new Array<ManageResult>();
  viewMode:string=null;
  dataNotfound:string=null;
  constructor(
    protected navCtrl: NavController,
    private nav: Nav,
    private session: UserSessionService,
    private resultEntryService: ResultEntryService) {
    super(session, navCtrl);
    this.viewMode="first"
  }

  ionViewDidLoad() {
    
    this.resultEntryService.findPendingMarksEntry(this.session.findRemote()).subscribe(data => {

      this.ploatPendingResultData(data.contents);
     // console.log("findPendingMarksEntry==", this.pendingResults);
    });

    this.resultEntryService.findMarksEntry(this.session.findRemote()).subscribe(data=>{
      //console.log("findMarksEntry==",data);
      this.ploatMarksEntryData(data.contents);
      if(this.marksIntersResults.length==0){
      this.dataNotfound="Data not found.";
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
