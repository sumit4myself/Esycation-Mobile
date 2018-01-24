import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { ProfileService } from "../../../providers/service/profile/profile.service";
import { Profile } from "../../../providers/model/profile/model.profile";
import { ServerConfig } from "../../../providers/config";
import { BaseComponent } from "../../baseComponent/base.component";
import { ApprovelService } from "../../../providers/service/approvel/approvel.service";
import { TimetableService } from "../../../providers/service/timetable/timetable.service";
import * as moment from "moment";
// import { toArray } from 'rxjs/operator/toArray';

@IonicPage()
@Component({
  selector: "staffdashboard-page",
  templateUrl: "staffdashboard.html"
})
export class StaffDashboardComponent extends BaseComponent implements OnInit {
  approvalSegement: string = "pendingRequests";
  attendanceSegement: string = "weekAttendance";

  //Time table section model
  timetableSegement: string = "todayTimetable";
  todayTimetable: any = null;
  weekTimetable: any = null;

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
    private approvelService: ApprovelService,
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

  fetchAttendanceStats() {
    //fetch for last 3 months
    this.attendanceStatReady = false;
    let toDate = moment(new Date()).format("DD/MM/YYYY");
    var fromDate = moment(new Date())
      .subtract(3, "months")
      .date(1)
      .format("DD/MM/YYYY");
    this.approvelService
      .findTeachersAttendanceStatistic(
        this.session.findRemote(),
        fromDate,
        toDate
      )
      .subscribe(
        data => {
          try {
            if (
              data &&
              data.count &&
              data.count.length > 0 &&
              data.data &&
              data.data.length > 0
            ) {
              let legend = [];
              let xAxes = [];
              let series = [];
              for (let i = 0; i < data.data.length; i++) {
                if (
                  data.data[i] &&
                  data.data[i].name &&
                  data.data[i].name.length > 0
                ) {
                  xAxes.push(data.data[i].name);
                }
                if (
                  i == 0 &&
                  data.data[i] &&
                  data.data[i].data &&
                  data.data[i].data.length > 0
                ) {
                  for (let j = 0; j < data.data[i].data.length; j++) {
                    legend.push(data.data[i].data[j].name);
                  }
                }
              }
              if (legend && legend.length > 0) {
                for (let k = 0; k < legend.length; k++) {
                  let seriesObj = {};
                  seriesObj["name"] = legend[k];
                  seriesObj["type"] = "bar";
                  seriesObj["stack"] = "stack";
                  let dataArray = [];
                  for (let ii = 0; ii < data.data.length; ii++) {
                    if (
                      data.data[ii] &&
                      data.data[ii].data &&
                      data.data[ii].data.length > 0
                    ) {
                      for (let jj = 0; jj < data.data[ii].data.length; jj++) {
                        if (legend[k] === data.data[ii].data[jj].name) {
                          dataArray.push(data.data[ii].data[jj].data);
                        }
                      }
                    }
                  }
                  seriesObj["data"] = dataArray;
                  series.push(seriesObj);
                }
              }

              if (
                legend &&
                legend.length > 0 &&
                xAxes &&
                xAxes.length > 0 &&
                series &&
                series.length > 0
              ) {
                this.teachersAttendanceStatOptions.legend.data = legend;
                this.teachersAttendanceStatOptions.xAxis[0].data = xAxes;
                this.teachersAttendanceStatOptions.series = series;
                this.attendanceStatReady = true;
              }
            }
          } catch (e) {
            this.attendanceStatReady = false;
          }
        },
        error => {
          this.attendanceStatReady = false;
          console.log(error);
        }
      );
  }

  fetchMyClasses() {
    this.isMyClassesLoaded = false;
    this.errorMessageMyClass = "";
    this.approvelService
      .findTeachersClasses(this.session.findRemote())
      .subscribe(
        data => {
          this.isMyClassesLoaded = true;
          this.staffTimeTable = data.timetables;
          let _data = data.timetables;
          var newData = {};
          newData = _data.reduce(function(result, current) {
            result[current.batchId.name] = result[current.batchId.name] || [];
            result[current.batchId.name].push(current);
            newData = result;
            return result;
          }, {});
          for (const key of Object.keys(newData)) {
            this.timeTableDataModel.push({ id: key, data: newData[key] });
          }
        },
        error => {
          this.errorMessageMyClass =
            "Unable to connect. Please try after some time. [ " + error + " ]";
          this.isMyClassesLoaded = true;
        }
      );
  }

  fetchMyRequests() {
    this.myrequest = [];
    this.isMyRequestLoaded = false;
    this.approvelService.findMyRequests(this.session.findUserId()).subscribe(
      data => {
        for (let group of data.contents) {
          let obj = Object.assign({}, group);
          this.myrequest.push(obj);
        }
        this.isMyRequestLoaded = true;
      },
      error => {
        console.error(error);
        this.isMyRequestLoaded = true;
      }
    );
  }

  ionViewDidLoad() {
    this.isLoaded = false;
    this.attendanceStatReady = false;
    this.errorMessage = "";
    this.profileService
      .findProfileDetails(this.session.findRemote(), this.session.findModule())
      .subscribe(
        data => {
          this.profile = Object.assign(this.profile, data);
          this.isLoaded = true;
        },
        error => {
          this.errorMessage =
            "Unable to connect. Please try after some time. [ " + error + " ]";
          this.isLoaded = false;
        }
      );
  }

  onView(viewName: string) {
    this.navControl.push(viewName);
  }

  onPendingRequest(model, id) {
    if (model == "STUDENT_LEAVE") {
      this.navControl.push("ApproveStudentLeaveComponent", { id: id });
    }
  }

  onPendingRequestClicked() {
    this.initApprovalRequests();
  }
  onMyRequestClicked() {
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


    this.initTodayTimetable();
    this.initApprovalRequests();

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

  initMyApprovalRequests() {
    this.approvelService.findMyRequests(6).subscribe(data => {
      this.myApprovalRequests = data;
    });
  }

  initApprovalRequests() {
    this.approvelService.findRequests(5).subscribe(data => {
      this.approvalRequests = data;
    });
  }

  initTodayTimetable() {
    this.timetableService.findTodayTimetableByTeacherId(1).subscribe(data => {
      this.todayTimetable = data;
    });
  }

  initWeekTimetable() {
    this.timetableService.findWeekTimetableByTeacherId(1).subscribe(data => {
      this.weekTimetable = data;
    });
  }
}
