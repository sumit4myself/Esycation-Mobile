import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, Slides } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { ServerConfig } from "../../../providers/config";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { StudentService } from "../../../providers/service/student/student.service";
import { StaffService } from "../../../providers/service/staff/staff.service";
import { AttendanceService } from "../../../providers/service/attendance/attendance.service";
import { BatchService } from "../../../providers/service/batch/batch.service";
import * as moment from "moment";
import { BaseComponent } from "../../baseComponent/base.component";
import { Observable } from "rxjs/Rx";
import { Student } from '../../../providers/model/student/model.student';
import { Staff } from '../../../providers/model/staff/model.staff';
import { EchartOptionBuilder, EchartDataTrnsformer } from '../../../providers/utilits/EChartUtils';
@IonicPage()
@Component({
  selector: "guardian-dashboard",
  templateUrl: "guardiandashboard.html"
})

export class GuardianDashboardComponent extends BaseComponent {

  @ViewChild("slides") slides: Slides;
  approvalSegement: string = "myRequests";
  attendanceSegement: string = "monthWiseAttendance";
  resultSegement: string = "examWiseResult";
  timeTableSegement: string = "todayTimetable";
  imagePath: String = ServerConfig.imagePath();
  studentId: number;
  studentObservable: Observable<any>;
  reportingTeacherObservable: Observable<any>;
  requestObservable: Observable<any>;
  monthWiseAttendanceObservable: Observable<any>;
  timeTableObservable: Observable<any>;
  todayTableObservable: Observable<any>;

  examWiseResultObservable: Observable<any>;
  termWiseResultObservable: Observable<any>;

  students: Array<Student> = new Array<Student>();
  teacher: Staff = new Staff();
  myApprovalRequests: any = null;
  approvalRequests: any = null;
  results: any = null;
  options: any;
  examWiswResultOption: any = null;
  termWiswResultOption: any = null;
  timeTables: any = null;
  todayTables: any = null;
  eventSource;
  studentName: string;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(
    protected navCtrl: NavController,
    protected session: UserSessionService,
    private studentService: StudentService,
    private approvalService: ApprovalService,
    private staffService: StaffService,
    private attendanceService: AttendanceService,
    private batchService: BatchService) {

    super(session, navCtrl);

  }

  ionViewDidLoad() {

    this.initStudents();
    this.onMyRequestClicked();
    this.onMonthAttendanceClicked();
  }

  

  onStudentSlide(studentId: number) {

    console.log("onStudentSlide===", studentId);
    if (studentId) {
      this.studentId = studentId;
      this.initReportingTeacher(this.studentId);
      this.initExamWiseResult(this.studentId);
      this.initBatchTimeTable(this.studentId);
      for (let s of this.students) {
        if (studentId == s.id) {
          this.studentName = s.name;
          break;
        }
      }
    }

  }

  onStudentRequestClicked() {
    this.initStudentApprovalRequests(this.studentId);
  }

  onMyRequestClicked() {
    this.initMyApprovalRequests();
  }

  onCurrentMonnthAttendanceClicked() {

    console.log("onCurrentMonnthAttendanceClicked..");

  }

  onStudentApprovalRequestsClicked() {

  }

  onTermwiseResultClick() {
    this.initTermWiseResult(this.studentId);
  }
  onExamWiseResultClick() {
    this.initExamWiseResult(this.studentId);
  }

  onTimeTableClick() {
    this.initBatchTimeTable(this.studentId);
  }
  onTodayTimeTableClick() {
    this.initTodayTimetable(this.studentId);
  }

  onMonthAttendanceClicked() {
    let startOfMonth = moment().startOf('month').format('DD/MM/YYYY');
    let endOfMonth = moment().endOf('month').format('DD/MM/YYYY');
    this.monthWiseAttendanceObservable = Observable.create(observer => {
      this.attendanceService.attendanceStatistics(this.session.findRemote(),
        this.session.findModule(), startOfMonth, endOfMonth)
        .subscribe(data => {
          this.options = EchartOptionBuilder.
            build3DChart(EchartDataTrnsformer.transformFor3DChart(data),
            this.monthWiseAtttendanceOptions());
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });

  }

  initStudents() {

    this.studentObservable = Observable.create(observer => {
      this.studentService.findByGuardianIdsWithCourseAndBatch(this.session.findRemote())
        .subscribe(data => {
          if (data.contents) {
            for (let student of data.contents) {
              this.students.push(Object.assign({}, student));
            }
            this.studentId = this.students[0].id;
            this.studentName = this.students[0].name;
            this.initReportingTeacher(this.studentId);
            this.initExamWiseResult(this.studentId);
           // this.initBatchTimeTable(this.studentId);
            this.initTodayTimetable(this.studentId);
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });
  }

  initReportingTeacher(studentId: number) {

    this.reportingTeacherObservable = Observable.create(observer => {
      this.staffService.findClassTeacherByStudentId(studentId).subscribe(data => {
        this.teacher = Object.assign({}, data);
        observer.next(data);
        observer.complete();
      },error=>{
        observer.next(error);
        observer.complete();
      });
    });

  }

  initMyApprovalRequests() {
    this.requestObservable = Observable.create(observer => {
      this.approvalService
        .findMyRequests(this.session.findUserId())
        .subscribe(data => {
          if (data.contents && data.contents.length) {
            this.myApprovalRequests = data.contents;
          } else {
            this.myApprovalRequests = null;
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });
  }


  initStudentApprovalRequests(studentId: number) {

    this.requestObservable = Observable.create(observer => {
      this.approvalService
        .findStudentApprovalRequests(studentId)
        .subscribe(data => {
          if (data.contents && data.contents.length) {
            this.approvalRequests = data.contents;
          } else {
            this.approvalRequests = null;
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });

  }


  initExamWiseResult(studentId: number) {

    this.examWiseResultObservable = Observable.create(observer => {
      this.approvalService
        .findStudentResultStatistic(studentId)
        .subscribe(data => {
          if (data.data && data.data.length) {

            var chartConfiguration = {
              yAxis: "Percentage ( % )",
              chartConfigurations: []
            };

            let tempData = EchartDataTrnsformer.transformFor3DChart(data);
            for (let legend of tempData.legends) {
              chartConfiguration.chartConfigurations.push({
                name: legend,
                type: 'bar',
                barWidth: 5,
              });
            }
            this.examWiswResultOption = EchartOptionBuilder.
              build3DChart(tempData, chartConfiguration);
          } else {
            this.results = null;
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });

  }

  initTermWiseResult(studentId: number) {

    this.termWiseResultObservable = Observable.create(observer => {
      this.approvalService
        .findTermWiseResultStatistics(studentId)
        .subscribe(data => {

          if (data.data && data.data.length) {

            var chartConfiguration = {
              yAxis: "Percentage ( % )",
              chartConfigurations: []
            };

            let tempData = EchartDataTrnsformer.transformFor3DChart(data);
            for (let legend of tempData.legends) {
              chartConfiguration.chartConfigurations.push({
                name: legend,
                type: 'bar',
                barWidth: 5,
              });
            }
            this.termWiswResultOption = EchartOptionBuilder.
              build3DChart(tempData, chartConfiguration);
          } else {
            this.results = null;
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });
  }

  initBatchTimeTable(studentId: number) {

    this.timeTableObservable = Observable.create(observer => {
      this.batchService.findBatchTimetablesByStudentId(studentId)
        .subscribe(data => {
          if (data) {
            this.timeTables = data;
          } else {
            this.timeTables = null;
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });
  }

  initTodayTimetable(studentId: number) {

    this.todayTableObservable = Observable.create(observer => {
      this.batchService.findTodayBatchTimetablesByStudentId(studentId)
        .subscribe(data => {
          if (data) {
            this.todayTables = data;
          } else {
            this.todayTables = null;
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });
  }

  monthWiseAtttendanceOptions(): any {

    let chartConfiguration = {
      yAxis: "Count",
      color: ['#00897b', '#f4511e', '#ffb300', '#00acc1', '#8bc34a'],
      chartConfigurations: [
        {
          name: 'PRESENT',
          type: 'bar',
          stack: 'stack',
          barWidth: 10,
        },
        {
          name: 'ABSENT',
          type: 'bar',
          stack: 'stack',
          barWidth: 10,
        },
        {
          name: 'LEAVE',
          type: 'bar',
          stack: 'stack',
          barWidth: 10,
        },
        {
          name: 'HOLIDAY',
          type: 'bar',
          stack: 'stack',
          barWidth: 10,
        },
        {
          name: 'WORKING_DAYS',
          type: 'bar',
          barWidth: 10,
        }
      ]
    };
    return chartConfiguration;
  }

}