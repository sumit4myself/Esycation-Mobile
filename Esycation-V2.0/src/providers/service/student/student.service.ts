
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/base.service';
import { CommonServices } from '../common/common.service';
import { UserSessionService } from '../../service/core/user.session.service';
import { Student } from '../../model/student/model.student';

@Injectable()
export class StudentService extends BaseService<Student> {

  constructor( @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService) protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices) {
    super(http, errorHandler);
  }

  findByBatchIds(batchId: number, viewName: string): Observable<any> {

    let url: string = ServerConfig.getPath() +
      "/students/findByBatchIds/" + batchId + "/?RESPONSE_VIEW=" + viewName + "&page=1&&size=1000";

    return this.findAll(url);
  }

  public findByGuardianIdsWithCourseAndBatch(remoteId: number): Observable<any> {

    let url: string = ServerConfig.getPath() + "/students/findByGuardianIdsWithCourseAndBatch/" + remoteId + "?RESPONSE_VIEW=Student.MinDetails";

    return this.findAll(url);
  }

}