import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../../config";
import { Observable } from "rxjs/Rx";
import { CostumErrorHandler } from "../../core/error.service";
import { BaseService } from "../../core/base.service";
import { CommonServices } from "../../common/common.service";
import { UserSessionService } from "../../../service/core/user.session.service";
import { Batch } from "../batch/batch.model";

@Injectable()
export class BatchService extends BaseService<Batch> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService)
    protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices
  ) {
    super(http, errorHandler);
  }

  public findByIds(ids: string, view: String = "Batch.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/batches/findByIds/"+ids+"?RESPONSE_VIEW=" + view;
    return this.get(url);
  }

  public findAll(page: number = 1, size: number = 100, restricted: boolean = true, view: String = "Batch.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/batches/?RESPONSE_VIEW=" + view + "&restricted=" + restricted + "&page=" + page + "&size=" + size;
    return this.get(url);
  }

  public findByCourseIds(ids: string, page: number = 1, size: number = 100, restricted: boolean = true, view: String = "Batch.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/batches/findByCourseIds/"+ids+"?RESPONSE_VIEW=" + view + "&restricted=" + restricted + "&page=" + page + "&size=" + size;
    return this.get(url);
  }

  public findByClassTeacherIds(ids: string, view: String = "Batch.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/batches/findByClassTeacherIds/"+ids+"?RESPONSE_VIEW=" + view;
    return this.get(url);
  }

  public findByStudentId(id: string,view: String = "Batch.NameId"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/batches/findByStudentId/"+id+"?RESPONSE_VIEW=" + view;
    return this.get(url);
  }

}
