import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { ProfileService } from "../../../providers/service/profile/profile.service";
import { Profile } from "../../../providers/model/profile/model.profile";
import { ServerConfig } from "../../../providers/config";
import { BaseComponent } from "../../baseComponent/base.component";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { TimetableService } from "../../../providers/service/timetable/timetable.service";
import { AttendanceService } from '../../../providers/service/attendance/attendance.service';
import { Observable } from "rxjs/Rx";
import * as moment from "moment";
import { EchartOptionBuilder, EchartDataTrnsformer } from '../../../providers/utilits/EChartUtils';

@IonicPage()
@Component({
  selector: "staffdashboard-page",
  templateUrl: "staffdashboard.html"
})
export class StaffDashboardComponent extends BaseComponent implements OnInit {
  _this = this;

  //profile section model
  profileObservable: Observable<any>;

  attendanceSegement: string = "monthWiseAttendance";

  //Time table section model
  timetableObservable: Observable<any>;
  timetableSegement: string = "todayTimetable";
  todayTimetable: any = null;
  weekTimetable: any = null;

  approvalObservable: Observable<any>;
  monthWiseAttendanceObservable: Observable<any>;
  approvalSegement: string = "pendingRequests";
  myApprovalRequests: any = null;
  approvalRequests: any = null;

  options: any;
  currentDay: string = "";
  isLoaded: boolean = false;
  isMyClassesLoaded: boolean = false;
  errorMessageMyClass: string = "";
  errorMessage: string = "";
  staffTimeTable: Array<any>;
  isMyRequestLoaded: boolean = false;
  isPendingRequestLoaded: boolean = false;
  mypendingrequest: Array<Object> = new Array<Object>();
  myrequest: Array<Object> = new Array<Object>();
  myrequests: string = "pendings";
  profile: Profile = Profile.getInstance();
  imagePath: String = ServerConfig.imagePath();
  attendanceStatReady: boolean = false;
  eventSource;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }; 

  teachersAttendanceStatOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: []
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: []
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: []
  };

  timeTableDataModel = [];
  // reqLeavePage = RequestStaffLeaveComponent;

  constructor(
    protected navControl: NavController,
    protected session: UserSessionService,
    private approvalService: ApprovalService,
    public profileService: ProfileService,
    private timetableService: TimetableService,
    private attendanceService: AttendanceService
  ) {
    super(session, navControl);
    this.currentDay = moment(new Date()).format("dddd");
    this.attendanceSegement= "monthWiseAttendance";
  
  }

  onPendingItemClick() {
    // alert(id);
    // this.navContrle.push(reqLeavePage);
  }

  ionViewDidLoad() {
    this.initProfile();
    this.initApprovalRequests();
    this.initTodayTimetable();
    this.initMonthWiseAttendance();

  }

  onView(viewName: string) {
    this.navControl.push(viewName);
  }

  onPendingRequest(module, taskId) {
    if (module == "STUDENT_LEAVE") {
      this.navControl.push("ApproveStudentLeaveComponent", { taskId: taskId });
    }

  }

  onPendingRequestClicked() {
    console.log("onPendingRequestClicked");
    this.initApprovalRequests();
  }
  onMyRequestClicked() {
    console.log("onMyRequestClicked");
    this.initMyApprovalRequests();
  }

  onTodayTimetableClicked() {
    this.initTodayTimetable();
  }
  onWeekTimetableClicked() {
    this.initWeekTimetable();
  }

  onMonthAttendanceClicked() {
    let startOfMonth = moment().startOf('month').format('DD/MM/YYYY');
    let endOfMonth = moment().endOf('month').format('DD/MM/YYYY');
    this.monthWiseAttendanceObservable= Observable.create(observer => {
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

  onCurrentMonnthAttendanceClicked() { 

    console.log("onCurrentMonnthAttendanceClicked..");
   // this.eventSource =  this.createRandomEvents(); 
  }

  ngOnInit() {
   
  }

  initMonthWiseAttendance(){
    this.onMonthAttendanceClicked();
  }

  initProfile() {
    this.profileObservable = Observable.create(observer => {
      this.profileService
        .findProfileDetails(
        this.session.findRemote(),
        this.session.findModule()
        )
        .subscribe(
        data => {
          this.profile = Object.assign(this.profile, data);
          observer.next(data);
          observer.complete();
        },
        error => {
          this.errorMessage =
            "Unable to connect. Please try after some time. [ " +
            error +
            " ]";
          this.isLoaded = false;
          observer.next(null);
          observer.complete();
        }
        );
    });
  }

  initMyApprovalRequests() {
    this.approvalObservable = Observable.create(observer => {
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

  initApprovalRequests() {
    this.approvalObservable = Observable.create(observer => {
      this.approvalService
        .findRequests(this.session.findUserId())
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

  initTodayTimetable() {
    this.timetableObservable = Observable.create(observer => {
      this.timetableService
        .findTodayTimetableByTeacherId(this.session.findRemote())
        .subscribe(data => {
          if (data) {
            this.todayTimetable = data;
          } else {
            this.todayTimetable = null;
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });
  }

  initWeekTimetable() {
    this.timetableObservable = Observable.create(observer => {
      this.timetableService
        .findWeekTimetableByTeacherId(this.session.findRemote())
        .subscribe(data => {
          if (data) {
            this.weekTimetable = data;
          } else {
            this.weekTimetable = null;
          }
          observer.next(data);
          observer.complete();
        },error=>{
          observer.next(error);
          observer.complete();
        });
    });
  }


  monthWiseAtttendanceOptions():any{

    let chartConfiguration = {
          yAxis : "Count",
          color : [ '#00897b','#f4511e','#ffb300', '#00acc1', '#8bc34a' ],
          chartConfigurations : [
            {
              name : 'PRESENT',
              type : 'bar',
              stack : 'stack',
              barWidth : 10,
            },
            {
              name : 'ABSENT',
              type : 'bar',
              stack : 'stack',
              barWidth : 10,
            },
            {
              name : 'LEAVE',
              type : 'bar',
              stack : 'stack',
              barWidth : 10,
            },
            {
              name : 'HOLIDAY',
              type : 'bar',
              stack : 'stack',
              barWidth : 10,
            },
            {
              name : 'WORKING_DAYS',
              type : 'bar',
              barWidth : 10,
            }
          ]
        };
       return chartConfiguration;
  }

  createRandomEvents():any {
    var events = [];

    
    for (var i = 0; i < 5; i += 1) {
        var date = new Date();
        var eventType = Math.floor(Math.random() * 2);
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startTime;
        var endTime;

        //console.log("eventType==",eventType,"startDay==",startDay,"endDay=",endDay,"startTime=",startTime,"endTime==",endTime);
        if (eventType === 0) {
            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
            if (endDay === startDay) {
                endDay += 1;
            }
            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        } else {
            var startMinute = Math.floor(Math.random() * 24 * 60);
            var endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
    }

    console.log(JSON.stringify(events));

    return events;
}

}
