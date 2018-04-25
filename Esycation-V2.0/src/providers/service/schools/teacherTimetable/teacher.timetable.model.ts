import { Batch } from "../batch/batch.model";
import { Course } from "../course/course.model";
import { Subject } from "../subject/subject.model";

export class Timetable {
  id: number = null;
  status: string = "A";
  batchId: Batch = new Batch();
  courseId: Course = new Course();
  timetableDays = new Array<TimetableDay>();
}

export class TimetableDay {
  id: number = null;
  dayId: number = null;
  dayName: string = null;
  periods = new Array<Period>();
}

export class Period {
  id: number = null;
  start: string = null;
  end: string = null;
  subjectId: Subject = new Subject();
  teacherId: number = null;
  breakName: string = null;
  title: string = "Period";
  subjectName: string = null;
  isRepeatable: boolean = false;
  isBreak: boolean = false;
}

export class TimetableDetails {
  course: string = null;
  batch: string = null;
  duration: string = null;
  subject: string = null;
}

export class DayTimetable {
  dayName: string = null;
  dayId: number = null;
  timetables = new Array<TimetableDetails>();
}

export class WeekTimetable {
  dayTimetables = new Array<DayTimetable>();
}

export class TimetableTransormer {
  public static transformToDayTimetable(
    data: any,
    dayId: number
  ): DayTimetable {
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

  public static transformToWeekTimetable(data: any): WeekTimetable {
    let timetables = Array<Timetable>();
    for (let timetable of data.timetables) {
      let temp = new Timetable();
      temp = Object.assign({}, timetable);
      timetables.push(temp);
    }
    let dayTimetables = new Array<DayTimetable>();
    timetables.forEach(timetable => {
      timetable.timetableDays.forEach(timetableDay => {
        let dayTimetable = null;
        dayTimetables.forEach(_dayTimetable => {
          if (_dayTimetable.dayId == timetableDay.dayId) {
            dayTimetable = _dayTimetable;
          }
        });
        if (dayTimetable == null) {
          dayTimetable = new DayTimetable();
          dayTimetables.push(dayTimetable);
        }
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
      });
    });
    let weekTimetable = new WeekTimetable();
    weekTimetable.dayTimetables = dayTimetables;
    return weekTimetable;
  }
}
