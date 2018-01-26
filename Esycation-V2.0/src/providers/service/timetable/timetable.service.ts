import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../config";
import { CostumErrorHandler } from "../core/error.service";
import { Observable } from "rxjs/Rx";
import { BaseService } from "../core/base.service";
import {
  TimetableTransormer,
  DayTimetable,
  TimetableDetails,
  Timetable
} from "../../model/timetable/model.timetable";
import * as moment from "moment";

@Injectable()
export class TimetableService extends BaseService<Timetable> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler
  ) {
    super(http, errorHandler);
  }

  findTodayTimetableByTeacherId(teacherId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/teacherTimetables/" + teacherId;
    let observable = Observable.create(observer => {
      this.findAll(url).subscribe(
        data => {
          let day = 1;
          moment().day();
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

  findWeekTimetableByTeacherId(teacherId: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "/teacherTimetables/" + teacherId;
    let observable = Observable.create(observer => {
      this.findAll(url).subscribe(
        data => {
          observer.next(TimetableTransormer.transformToWeekTimetable(data));
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

  transformToDayTimetable(data: any, dayId: number): DayTimetable {
    let timetables = Array<Timetable>();
    for (let timetable of data.timetables) {
      let temp = new Timetable();
      temp = Object.assign({}, timetable);
      timetables.push(temp);
    }
    let dayTimetable = new DayTimetable();
    timetables.forEach(timetable => {
      timetable.timetableDays.forEach(timetableDay => {
        if (dayId == timetableDay.dayId) {
          dayTimetable.dayId = timetableDay.dayId;
          dayTimetable.dayName = timetableDay.dayName;
          timetableDay.periods.forEach(period => {
            let timetableDetails = new TimetableDetails();
            timetableDetails.subject = period.subjectId.name;
            timetableDetails.course = timetable.courseId.name;
            timetableDetails.batch = timetable.batchId.name;
            timetableDetails.duration = period.start + " - " + period.end;
            dayTimetable.timetables.push(timetableDetails);
          });
        }
      });
    });
    return dayTimetable;
  }
}
