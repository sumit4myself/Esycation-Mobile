import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../../config";
import { Observable } from "rxjs/Rx";
import { CostumErrorHandler } from "../../core/error.service";
import { BaseService } from "../../core/base.service";
import { CommonServices } from "../../common/common.service";
import { UserSessionService } from "../../../service/core/user.session.service";
import { Department } from "../department/department.model";

@Injectable()
export class DepartmentService extends BaseService<Department> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService)
    protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices
  ) {
    super(http, errorHandler);
  }

  public findAll(
    page: number = 1,
    size: number = 100,
    view: string = "Department.NameId"
  ): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/departments/?RESPONSE_VIEW=" +
      view +
      "&page=" +
      page +
      "&size=" +
      size;
    return this.get(url);
  }

  public findByBranchIds(
    id: string,
    page: number = 1,
    size: number = 100,
    view: string = "Department.NameId"
  ): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/departments/findByBranchIds/" +
      id +
      "?RESPONSE_VIEW=" +
      view +
      "&page=" +
      page +
      "&size=" +
      size;
    return this.get(url);
  }
}
