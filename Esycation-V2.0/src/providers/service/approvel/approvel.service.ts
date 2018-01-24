import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../config";
import { CostumErrorHandler } from "../core/error.service";
import { Observable } from "rxjs/Rx";
import { BaseService } from "../core/base.service";

@Injectable()
export class ApprovelService extends BaseService<any> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler
  ) {
    super(http, errorHandler);
  }



  public findTeachersClasses(userId: number): Observable<any> {
    let url: string = ServerConfig.getPath() + "/teacherTimetables/" + userId;
    return this.findAll(url);
  }

  public findTeachersAttendanceStatistic(
    userId: number,
    fromDate: string,
    toDate: string
  ): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/attendances/report/statistics/" +
      userId +
      "/STAFF?suppressError=true&fromDate=" +
      fromDate +
      "&toDate=" +
      toDate;
    return this.findAll(url);
  }

  public findStudentAttendanceStatistic(
    studentId: number,
    fromDate: string,
    toDate: string
  ): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/attendances/report/statistics/" +
      studentId +
      "/STUDENT?fromDate=" +
      fromDate +
      "&toDate=" +
      toDate;
    return this.findAll(url);
  }

  public findStudentResultStatistic(studentId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/results/report/statistics/exam/" + studentId;
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

  public findRequest(taskId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/approvals/requests/" + taskId + "/task";
    return this.findAll(url);
  }
}
