
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfig } from '../../../config';
import { CostumErrorHandler } from '../../core/error.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../core/base.service';
import { CommonServices } from '../../common/common.service';
import { UserSessionService } from '../../../service/core/user.session.service';
import { Student } from '../student/student.model';

@Injectable()
export class StudentService extends BaseService<Student> {

  constructor( @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService) protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices) {
    super(http, errorHandler);
  }

  public findByIds(ids: string, view: String = "Student.NameId"): Observable<any> {
    let url: string = ServerConfig.getPath()
    + "/students/findByIds/"+ids+"?RESPONSE_VIEW=" + view;
    return this.get(url);
  }

  public findAll(page: number = 1, size: number = 100, view: string = "Student.NameId"): Observable<any> {
    let url: string = ServerConfig.getPath()
    + "/students/?RESPONSE_VIEW=" + view + "&page=" + page + "&size=" + size;
    return this.get(url);
  }

  public findByBatchIds(ids: string, page: number = 1, size: number = 100, view: string= "Student.NameId"): Observable<any> {
    let url: string = ServerConfig.getPath()
      + "/students/findByBatchIds/" + ids + "/?RESPONSE_VIEW=" + view + "&page=" + page + "&size=" + size;
    return this.get(url);
  }

  public findByGuardianIdsWithCourseAndBatch(remoteId: number, view: string = "Student.NameId"): Observable<any> {
    let url: string = ServerConfig.getPath()
      + "/students/findByGuardianIdsWithCourseAndBatch/" + remoteId + "?RESPONSE_VIEW="+ view;
    return this.get(url);
  }

}
