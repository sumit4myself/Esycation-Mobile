import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, Slides } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { ServerConfig } from "../../../providers/config";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { StudentService } from "../../../providers/service/student/student.service";
import { StaffService } from "../../../providers/service/staff/staff.service";
import { AttendanceService } from "../../../providers/service/attendance/attendance.service";
import * as moment from "moment";
import { Observable } from "rxjs/Rx";
import { Student } from '../../../providers/model/student/model.student';
import { Staff } from '../../../providers/model/staff/model.staff';
import { EchartOptionBuilder, EchartDataTrnsformer } from '../../../providers/utilits/EChartUtils';
@IonicPage()
@Component({
  selector: "guardian-dashboard",
  templateUrl: "guardiandashboard.html"
})

export class GuardianDashboardComponent {

  @ViewChild("slides") slides: Slides;
  approvalSegement: string = "pendingRequests";
  attendanceSegement: string = "monthWiseAttendance";
  imagePath: String = ServerConfig.imagePath();
  studentId: number;
  studentObservable: Observable<any>;
  reportingTeacherObservable: Observable<any>;
  approvalObservable: Observable<any>;
  monthWiseAttendanceObservable: Observable<any>;
  resultObservable: Observable<any>;
  students: Array<Student> = new Array<Student>();
  teacher: Staff = new Staff();
  myApprovalRequests: any = null;
  approvalRequests: any = null;
  options: any;
  eventSource;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }; 

  constructor(
    private navContrle: NavController,
    private session: UserSessionService,
    private studentService: StudentService,
    private approvalService: ApprovalService,
    private staffService: StaffService,
    private attendanceService: AttendanceService) {
    let currentDay = moment(new Date()).format("dddd");
    console.log(this.navContrle, this.approvalService);
    console.log("currentDay==", currentDay);
  }

  ionViewDidLoad() {

    this.initStudents();
  }

  onStudentSlide(studentId: number) {

    console.log("studentId===", studentId);
  }

  onPendingRequestClicked() {
    this.initApprovalRequests(this.studentId);
  }

  onMyRequestClicked() {
    this.initMyApprovalRequests(this.studentId);
  }

  onCurrentMonnthAttendanceClicked() {

    console.log("onCurrentMonnthAttendanceClicked..");

  }

  onResultlicked() {

  }

  initStudents() {

    this.studentObservable = Observable.create(observer => {
      this.studentService.findByGuardianIdsWithCourseAndBatch(this.session.findRemote())
        .subscribe(data => {
          if (data.contents) {
            for (let student of data.contents) {
              this.students.push(Object.assign({}, student));
            }
            this.initReportingTeacher(this.students[0].id);
            this.initApprovalRequests(this.students[0].id);
            this.studentId = this.students[0].id;
          }
          observer.next(data);
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
      });
    });

  }

  initMyApprovalRequests(studentId: number) {
    this.approvalObservable = Observable.create(observer => {
      this.approvalService
        .findMyRequests(studentId)
        .subscribe(data => {
          if (data.contents && data.contents.length) {
            this.myApprovalRequests = data.contents;
          } else {
            this.myApprovalRequests = null;
          }
          observer.next(data);
          observer.complete();
        });
    });
  }

  initApprovalRequests(studentId: number) {

    this.approvalObservable = Observable.create(observer => {
      this.approvalService
        .findRequests(studentId)
        .subscribe(data => {
          if (data.contents && data.contents.length) {
            this.approvalRequests = data.contents;
          } else {
            this.approvalRequests = null;
          }
          observer.next(data);
          observer.complete();
        });
    });
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