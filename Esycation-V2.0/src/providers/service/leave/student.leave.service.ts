import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/base.service';
import { LeaveModel } from '../../model/leave/model.leave';
@Injectable()
export class StudentLeaveService extends BaseService<LeaveModel> {


  constructor( @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
  ) {
    super(http, errorHandler);
  }


  public saveLeave(data: any): Observable<any> {

    let url: string = ServerConfig.getPath() + "/studentLeaves";

    return this.save(url, data);
  }

  public findStudentByGuardianIds(remoteId: number): Observable<any> {

    let url: string = ServerConfig.getPath() + "/students/findByGuardianIds/" + remoteId;

    return this.findAll(url);
  }


  public findStudentListByGuardianIds(remoteId: number): Observable<any> {

    let url: string = ServerConfig.getPath() + "/students/findByGuardianIdsWithCourseAndBatch/" + remoteId + "?RESPONSE_VIEW=Student.MinDetails";

    return this.findAll(url);
  }

  public findTeacherDetailsByStudentId(studentId: number): Observable<any> {
    let url: string = ServerConfig.getPath() + "/staffs/findClassTeacherByStudentId/" + studentId + "?RESPONSE_VIEW=Staff.MinDetails";
    return this.findAll(url);
  }

  public findTimeTableByStudentId(studentId: number): Observable<any> {

    // /staffs/findClassTeacherByStudentId/{studentId}/?RESPONSE_VIEW=Staff.MinDetails
    let url: string = ServerConfig.getPath() + "/batchTimetables/findByStudentId/" + studentId + "?RESPONSE_VIEW=BatchTimetable.Details";

    return this.findAll(url);
  }

  public saveStaffLeave(data: any): Observable<any> {

    let url: string = ServerConfig.getPath() + "/staffLeaves";

    return this.save(url, data);
  }

  public findRemaining(remoteId: number): Observable<any> {
    let url: string = ServerConfig.getPath() + "/staffLeaveDefinitions//remaining/" + remoteId + "?RESPONSE_VIEW=StaffLeaveDefinition.Remaining";
    return this.findAll(url);
  }

  public findRequest(taskId: number): Observable<any> {
    let url: string = ServerConfig.getPath() + "/approvals/requests/" + taskId + "/task";
    return this.findAll(url);
  }

}