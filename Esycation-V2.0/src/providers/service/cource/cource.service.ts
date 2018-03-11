import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { Observable } from 'rxjs/Rx';
import { CostumErrorHandler } from '../core/error.service';
import { BaseService } from '../core/base.service';
import { CommonServices } from '../common/common.service';
import { UserSessionService } from '../../service/core/user.session.service';
import { Cource } from '../../model/cources/model.cource';

@Injectable()
export class CourceService extends BaseService<Cource>{

  constructor(@Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService) protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices) {
    super(http, errorHandler);
  }

  public findAllcourses(viewName: string): Observable<any> {
    let url: string = ServerConfig.getPath()
      + "/courses/?RESPONSE_VIEW=" + viewName + "";

    return this.findAll(url);
  }

  public findAllowedCourses(viewName: string): Observable<any> {

    let url: string = ServerConfig.getPath()
      + "/courses/?RESPONSE_VIEW=" + viewName + "&restricted=true";

    return this.findAll(url);

  }

}