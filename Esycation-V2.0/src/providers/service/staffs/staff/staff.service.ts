
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfig } from '../../../config';
import { Observable } from 'rxjs/Rx';
import { CostumErrorHandler } from '../../core/error.service';
import { BaseService } from '../../core/base.service';
import { CommonServices } from '../../common/common.service';
import { UserSessionService } from '../../../service/core/user.session.service';
import { Staff } from '../staff/staff.model';

@Injectable()
export class StaffService extends BaseService<Staff>{

  constructor( @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService) protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices) {
    super(http, errorHandler);
  }

  public findByIds(ids: string, view: String = "Staff.NameId"): Observable<any> {
    let url: string = ServerConfig.getPath() + "/staffs/findByIds/"+ids+"?RESPONSE_VIEW=" + view;
    return this.get(url);
  }

  public findAll(page: number = 1, size: number = 100, view: string = "Staff.NameId"): Observable<any> {
    let url: string = ServerConfig.getPath()
    + "/staffs/?RESPONSE_VIEW=" + view + "&page=" + page + "&size=" + size;
    return this.get(url);
  }

  public findByDepartmentIds(ids: String, page: number = 1, size: number = 100, view: string= "Staff.NameId"): Observable<any> {
    let url: string = ServerConfig.getPath()
    + "/staffs/findByDepartmentIds/" + ids + "?RESPONSE_VIEW=" + view + "&page=" + page + "&size=" + size;
    return this.get(url);
  }

  public findClassTeacherByStudentId(id: number, view: string = "Staff.NameId"): Observable<any> {
    let url: string = ServerConfig.getPath()
    + "/staffs/findClassTeacherByStudentId/" + id + "?RESPONSE_VIEW=" + view;
    return this.get(url);
  }

}
