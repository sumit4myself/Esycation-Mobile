import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../config";
import { CostumErrorHandler } from "../core/error.service";
import { Observable } from "rxjs/Rx";
import { BaseService } from "../core/base.service";

@Injectable()
export class ApprovalService extends BaseService<any> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler
  ) {
    super(http, errorHandler);
  }

  public findStudentResultStatistic(studentId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/results/report/statistics/exam/" + studentId;
    return this.findAll(url);
  }


  public findTermWiseResultStatistics(studentId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/results/report/statistics/term/" + studentId;
    return this.findAll(url);
  }
  public approve(taskId: number, comment: string): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/approvals/requests/" +
      taskId +
      "/approve?comment=" +
      comment;

    return this.find(url);
  }

  public reject(taskId: number, comment: string): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/approvals/requests/" +
      taskId +
      "/reject?comment=" +
      comment;

    return this.find(url);
  }

  public cancel(processInstanceId: number, comment: string): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/approvals/requests/" +
      processInstanceId +
      "/cancel?comment=" +
      comment;

    return this.find(url);
  }


  public findRequests(userId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/approvals/requests/" +
      userId +
      "?suppressError=true&page=1&size=50";
    return this.findAll(url);
  }

  public findMyRequests(userId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/approvals/myRequests/" +
      userId +
      "?suppressError=true&page=1&size=50";
    return this.findAll(url);
  }

  public findStudentApprovalRequests(studentId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/approvals/myRequests/" +
      studentId +
      "/STUDENT?suppressError=true&page=1&size=50";
    return this.findAll(url);
  }

  public findRequest(taskId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/approvals/requests/" + taskId + "/task";
    return this.findAll(url);
  }

  public findMyRequest(request:any): Observable<any>{

    let url:string =  ServerConfig.getPath() ;
    let myRequesturl:string="";
    if(request.module=='STAFF'){
      myRequesturl = "/staffHistories/"+request.targetId;
    }
    else if(request.module=='GUARDIAN'){
      myRequesturl = "/guardianHistories/"+request.targetId;
    }
    else if(request.module=='STUDENT'){
      myRequesturl = "/studentHistories/"+request.targetId;
    }
    else if(request.module=='STAFF_LEAVE'){
      myRequesturl = "/"+request.api+"/"+request.targetId+"?RESPONSE_VIEW=StaffLeave.Details";
    }
    else if(request.module=='STUDENT_LEAVE'){
      myRequesturl = "/"+request.api+"/"+request.targetId+"?RESPONSE_VIEW=StudentLeave.Details";
    }
    else {
      myRequesturl = "/"+request.api+"/"+request.targetId;
    }
    url=url+myRequesturl;
    return this.findAll(url);
  }
}
