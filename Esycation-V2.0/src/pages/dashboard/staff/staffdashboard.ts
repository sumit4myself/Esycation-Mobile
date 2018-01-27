import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { ProfileService } from "../../../providers/service/profile/profile.service";
import { Profile } from "../../../providers/model/profile/model.profile";
import { ServerConfig } from "../../../providers/config";
import { BaseComponent } from "../../baseComponent/base.component";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { TimetableService } from "../../../providers/service/timetable/timetable.service";
import { Observable } from "rxjs/Rx";
import * as moment from "moment";

@IonicPage()
@Component({
  selector: "staffdashboard-page",
  templateUrl: "staffdashboard.html"
})
export class StaffDashboardComponent extends BaseComponent implements OnInit {
  _this = this;

  //profile section model
  profileObservable: Observable<any>;

  attendanceSegement: string = "weekAttendance";

  //Time table section model
  timetableObservable: Observable<any>;
  timetableSegement: string = "todayTimetable";
  todayTimetable: any = null;
  weekTimetable: any = null;

  approvalObservable: Observable<any>;
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
    private timetableService: TimetableService
  ) {
    super(session, navControl);
    this.currentDay = moment(new Date()).format("dddd");
  }

  onPendingItemClick() {
    // alert(id);
    // this.navContrle.push(reqLeavePage);
  }

  ionViewDidLoad() {
    this.initProfile();
    this.initApprovalRequests();
    this.initTodayTimetable();
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

  onMonthAttendanceClicked() {}
  onWeekAttendanceClicked() {}

  ngOnInit() {
    let xAxisData = [];
    let data1 = [];
    let data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push("category" + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ["bar", "bar2"],
        align: "left"
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [
        {
          name: "bar",
          type: "bar",
          data: data1,
          animationDelay: function(idx) {
            return idx * 10;
          }
        },
        {
          name: "bar2",
          type: "bar",
          data: data2,
          animationDelay: function(idx) {
            return idx * 10 + 100;
          }
        }
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function(idx) {
        return idx * 5;
      }
    };
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
        });
    });
  }
}
