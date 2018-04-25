
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from '../core/base.service';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import { ServerConfig } from '../../../providers/config';
import { StudentAttendanceDetails } from '../../model/attendance/model.attendance';
import { PagedResponse } from '../../model/common/PaggedResponse';

@Injectable()
export class AttendanceService extends BaseService<StudentAttendanceDetails>{


  constructor( @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
  ) {
    super(http, errorHandler);
  }

  public findStudentByBatchId(batchId: number): Observable<PagedResponse> {

    let url: string = ServerConfig.getPath() +
      "/students/findByBatchIds/" + batchId + "/?RESPONSE_VIEW=Student.Details&page=1&&size=1000";

    return this.get(url);
  }

  public findBatchByRemoteId(remoteId: number): Observable<PagedResponse> {


    let url: string = ServerConfig.getPath() +
      "/batches/findByClassTeacherIds/" + remoteId + "/?RESPONSE_VIEW=Batch.Details&page=1&&size=1000";

    return this.get(url);
  }


  public findTodayAttendance(id: number): Observable<any> {

    let url: string = ServerConfig.getPath() +
      "/studentAttendances/today/" + id + "/?RESPONSE_VIEW=StudentAttendance.Details";
    return this.get(url);

  }

  public saveAttendance(data: any): Observable<any> {

    let url: string = ServerConfig.getPath() + "/studentAttendances";
    return this.post(url, data);
  }

  public updateAttendance(id: number, data: any): Observable<any> {

    let url: string = ServerConfig.getPath() + "/studentAttendances/" + id + "";
    return this.put(url, data);
  }


  public attendanceStatistics(remoteId: number, module: string, fromDate: string, toDate: string): Observable<any> {

    let url: string = ServerConfig.getPath()
      + "/attendances/report/statistics/" + remoteId + "/" + module + "?fromDate=" + fromDate + "&toDate=" + toDate + "";
    return this.get(url);
  }

  public attendanceReportDateWise(remoteId: number, module: string, fromDate: string, toDate: string): Observable<any> {

    let url: string = ServerConfig.getPath()
      + "/attendances/report/" + remoteId + "/" + module + "?fromDate=" + fromDate + "&toDate=" + toDate + "";
    return this.get(url);

  }
}      