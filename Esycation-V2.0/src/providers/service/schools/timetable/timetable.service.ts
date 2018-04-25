import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../../config";
import { Observable } from "rxjs/Rx";
import { CostumErrorHandler } from "../../core/error.service";
import { BaseService } from "../../core/base.service";
import { CommonServices } from "../../common/common.service";
import { UserSessionService } from "../../../service/core/user.session.service";
import { Timetable, TimetableTransormer } from "../timetable/timetable.model";
import * as moment from "moment";

@Injectable()
export class TimetableService extends BaseService<Timetable> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService)
    protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices
  ) {
    super(http, errorHandler);
  }

  public findBatchTimetablesByStudentId(id: number, view: String = "BatchTimetable.Details"): Observable<any> {
    let url: string =
      ServerConfig.getPath() +  "batchTimetables/findByStudentId/" + id + "?RESPONSE_VIEW="+view;
    return this.get(url);
  }

  public findTodayBatchTimetablesByStudentId(id: number, view: String = "BatchTimetable.Details"): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "batchTimetables/findByStudentId/" + id + "?RESPONSE_VIEW="+view;
    let observable = Observable.create(observer => {
      this.get(url).subscribe(
        data => {
          let day = moment().day();
          observer.next(TimetableTransormer.transformToDayTimetable(data, day));
          observer.complete();
        },
        error => {
          observer.next(null);
          observer.complete();
          console.log(error);
        }
      );
    });
    return observable;
  }
}
