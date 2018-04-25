import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../../config";
import { Observable } from "rxjs/Rx";
import { CostumErrorHandler } from "../../core/error.service";
import { BaseService } from "../../core/base.service";
import { CommonServices } from "../../common/common.service";
import { UserSessionService } from "../../../service/core/user.session.service";
import { Course } from "../course/course.model";

@Injectable()
export class CourseService extends BaseService<Course> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService)
    protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices
  ) {
    super(http, errorHandler);
  }

  public findByIds(ids: string, view: String = "Course.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/courses/findByIds/"+ids+"?RESPONSE_VIEW=" + view;
    return this.get(url);
  }

  public findAll(page: number = 1, size: number = 100, restricted: boolean = true, view: String = "Course.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/courses/?RESPONSE_VIEW=" + view + "&restricted=" + restricted + "&page=" + page + "&size=" + size;
    return this.get(url);
  }

  public findByBranchIds(ids: string, page: number = 1, size: number = 100, restricted: boolean = true, view: String = "Course.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/courses/findByBranchIds/"+ids+"?RESPONSE_VIEW=" + view + "&restricted=" + restricted + "&page=" + page + "&size=" + size;
    return this.get(url);
  }

  public findByStudentId(id: number,view: String = "Course.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/courses/findByStudentId/"+id+"?RESPONSE_VIEW=" + view;
    return this.get(url);
  }

}
