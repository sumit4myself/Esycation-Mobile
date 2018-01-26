import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, Slides } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { Profile } from "../../../providers/model/profile/model.profile";
import { ServerConfig } from "../../../providers/config";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { StudentLeaveService } from "../../../providers/service/leave/student.leave.service";
import * as moment from "moment";
@IonicPage()
@Component({
  selector: "guardiandashboard-page",
  templateUrl: "guardiandashboard.html"
})
export class GuardianDashboardComponent {
  @ViewChild("slides") slides: Slides;
  isLoaded: boolean = false;
  resultStatReady: boolean = false;
  currentDay: string = "";
  currentSelectedStudent: number;
  currentSelectedStudentName: string;
  reportingTeacher: any;
  timeTable: any;
  attendanceStatReady: boolean = false;
  isMyRequestLoaded: boolean = false;
  isPendingRequestLoaded: boolean = false;
  studentListBasedonGuardian: Array<any> = [];
  mypendingrequest: Array<Object> = new Array<Object>();
  myrequest: Array<Object> = new Array<Object>();
  myrequests: string = "pendings";
  studentResultOptions = {
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
  studentAttendanceStatOptions = {
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
  profile: Profile = Profile.getInstance();
  imagePath: String = ServerConfig.imagePath();

  constructor(
    private navContrle: NavController,
    private session: UserSessionService,
    // private profileService:ProfileService,
    private leaveService: StudentLeaveService,
    private approvalService: ApprovalService
  ) {
    this.currentDay = moment(new Date()).format("dddd");
  }

  onTimeTableDetails(items) {
    this.navContrle.push("TimeTableComponent", {
      timeTable: items
    });
  }

  fetchResultStatStats() {
    //fetch for last 3 months MADAN
    this.attendanceStatReady = false;
    // this.approvalService.findPending(this.session.findUserId())
    this.approvalService
      .findStudentResultStatistic(this.currentSelectedStudent)
      .subscribe(
        data => {
          console.log("RESULT = ", data);
          data = {
            data: [
              {
                id: 1,
                name: "Exam 1",
                data: [
                  { id: 1, name: "Subject 1", data: 91 },
                  { id: 1, name: "Subject 2", data: 22 },
                  { id: 1, name: "Subject 3", data: 84 },
                  { id: 1, name: "Subject 4", data: 79 },
                  { id: 1, name: "Subject 5", data: 34 }
                ]
              },
              {
                id: 2,
                name: "Exam 2",
                data: [
                  { id: 2, name: "Subject 1", data: 93 },
                  { id: 2, name: "Subject 2", data: 14 },
                  { id: 2, name: "Subject 3", data: 19 },
                  { id: 2, name: "Subject 4", data: 11 },
                  { id: 2, name: "Subject 5", data: 19 }
                ]
              },
              {
                id: 3,
                name: "Exam 3",
                data: [
                  { id: 3, name: "Subject 1", data: 80 },
                  { id: 3, name: "Subject 2", data: 97 },
                  { id: 3, name: "Subject 3", data: 57 },
                  { id: 3, name: "Subject 4", data: 21 },
                  { id: 3, name: "Subject 5", data: 81 }
                ]
              },
              {
                id: 4,
                name: "Exam 4",
                data: [
                  { id: 4, name: "Subject 1", data: 83 },
                  { id: 4, name: "Subject 2", data: 57 },
                  { id: 4, name: "Subject 3", data: 92 },
                  { id: 4, name: "Subject 4", data: 60 },
                  { id: 4, name: "Subject 5", data: 14 }
                ]
              },
              {
                id: 5,
                name: "Exam 5",
                data: [
                  { id: 5, name: "Subject 1", data: 65 },
                  { id: 5, name: "Subject 2", data: 79 },
                  { id: 5, name: "Subject 3", data: 22 },
                  { id: 5, name: "Subject 4", data: 15 },
                  { id: 5, name: "Subject 5", data: 45 }
                ]
              }
            ]
          };
          try {
            if (data && data.data && data.data.length > 0) {
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
                  seriesObj["type"] = "line";
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
                this.studentResultOptions.legend.data = legend;
                this.studentResultOptions.xAxis[0].data = xAxes;
                this.studentResultOptions.series = series;
                this.resultStatReady = true;
              }
            }
          } catch (e) {
            this.resultStatReady = false;
          }
        },
        error => {
          this.resultStatReady = false;
          console.log(error);
        }
      );
  }

  fetchAttendanceStats() {
    //fetch for last 3 months
    this.attendanceStatReady = false;
    let toDate = moment(new Date()).format("DD/MM/YYYY");
    var fromDate = moment(new Date())
      .subtract(3, "months")
      .date(1)
      .format("DD/MM/YYYY");
    this.approvalService
      .findStudentAttendanceStatistic(
        this.currentSelectedStudent,
        fromDate,
        toDate
      )
      .subscribe(
        data => {
          console.log(data);
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
                this.studentAttendanceStatOptions.legend.data = legend;
                this.studentAttendanceStatOptions.xAxis[0].data = xAxes;
                this.studentAttendanceStatOptions.series = series;
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

  fetchPendingRequests() {
    this.isPendingRequestLoaded = false;
    this.mypendingrequest = [];
    this.approvalService.findRequests(this.session.findUserId()).subscribe(
      data => {
        for (let group of data.contents) {
          let obj = Object.assign({}, group);
          this.mypendingrequest.push(obj);
        }
        console.log("----", this.mypendingrequest);
        this.isPendingRequestLoaded = true;
      },
      error => {
        console.error(error);
        this.isPendingRequestLoaded = true;
      }
    );
  }

  fetchMyRequests() {
    this.myrequest = [];
    this.isMyRequestLoaded = false;
    this.approvalService.findMyRequests(this.session.findUserId()).subscribe(
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

  setUpDashboard() {
    this.reportingTeacher = {};
    this.getTeacherDeatilsBasedOnStudentId();
    this.timeTable = {};
    this.getTimeTableBasedOnStudentId();
    this.attendanceStatReady = false;
    this.fetchAttendanceStats();
    this.attendanceStatReady = false;
    this.fetchResultStatStats();
  }

  studentSlideChanged() {
    let slideIndex: number = this.slides.getActiveIndex();
    if (
      this.studentListBasedonGuardian &&
      this.studentListBasedonGuardian.length > 0 &&
      this.studentListBasedonGuardian[slideIndex] &&
      this.studentListBasedonGuardian[slideIndex].name &&
      this.studentListBasedonGuardian[slideIndex].name.length > 0
    ) {
      this.currentSelectedStudent = this.studentListBasedonGuardian[
        slideIndex
      ].id;
      this.currentSelectedStudentName = this.studentListBasedonGuardian[
        slideIndex
      ].name;
      this.setUpDashboard();
    }
  }

  findStudentListBasedOnGuardianId() {
    this.leaveService
      .findStudentListByGuardianIds(this.session.findRemote())
      .subscribe(data => {
        // data = {"contents":[{"id":306,"name":"sameer sachdeva","gender":"Male","imageId":51,"email":"sameer@gmail.com","mobile":"9871965151","admissionId":{"registrationNumber":25360856,"admissionDate":"15/01/2018","registrations":[{"rollNumber":14,"batchId":81,"courseId":98}]},"guardianId":{"id":306,"name":"vinod","gender":"Male","email":"vindo@gmail.com","mobile":"9871965151","contactDetailId":{"addressLine1":"303","addressLine2":"mashad mohalla","city":"snp","state":"haryana","pinCode":"131001"}},"batch":{"schoolId":88,"branchId":77,"createdOn":"14/01/2018 22:24:53","createdBy":795,"updatedOn":"14/01/2018 22:38:20","updatedBy":795,"id":81,"name":"A","code":"101","classTeacherId":129,"status":"A"},"course":{"id":98,"name":"1st","code":"101"}},{"id":307,"name":"sameer sachdeva 1","gender":"Male","imageId":51,"email":"sameer@gmail.com","mobile":"9871965151","admissionId":{"registrationNumber":25360856,"admissionDate":"15/01/2018","registrations":[{"rollNumber":14,"batchId":81,"courseId":98}]},"guardianId":{"id":306,"name":"vinod","gender":"Male","email":"vindo@gmail.com","mobile":"9871965151","contactDetailId":{"addressLine1":"303","addressLine2":"mashad mohalla","city":"snp","state":"haryana","pinCode":"131001"}},"batch":{"schoolId":88,"branchId":77,"createdOn":"14/01/2018 22:24:53","createdBy":795,"updatedOn":"14/01/2018 22:38:20","updatedBy":795,"id":81,"name":"A","code":"101","classTeacherId":129,"status":"A"},"course":{"id":98,"name":"1st","code":"101"}},{"id":308,"name":"sameer sachdeva 2","gender":"Male","imageId":51,"email":"sameer@gmail.com","mobile":"9871965151","admissionId":{"registrationNumber":25360856,"admissionDate":"15/01/2018","registrations":[{"rollNumber":14,"batchId":81,"courseId":98}]},"guardianId":{"id":306,"name":"vinod","gender":"Male","email":"vindo@gmail.com","mobile":"9871965151","contactDetailId":{"addressLine1":"303","addressLine2":"mashad mohalla","city":"snp","state":"haryana","pinCode":"131001"}},"batch":{"schoolId":88,"branchId":77,"createdOn":"14/01/2018 22:24:53","createdBy":795,"updatedOn":"14/01/2018 22:38:20","updatedBy":795,"id":81,"name":"A","code":"101","classTeacherId":129,"status":"A"},"course":{"id":98,"name":"1st","code":"101"}}],"metadata":{"totalElements":15,"filteredElements":1,"size":10,"page":1,"totalPages":1}};
        if (data && data.contents && data.contents.length > 0) {
          this.studentListBasedonGuardian = data.contents;
          this.isLoaded = true;
          if (data.contents[0].id) {
            this.currentSelectedStudent = data.contents[0].id;
            this.currentSelectedStudentName = data.contents[0].name;
            this.setUpDashboard();
          }
        }
      });
  }

  // TIMETABLE by studentId
  getTimeTableBasedOnStudentId() {
    this.leaveService
      .findTimeTableByStudentId(this.currentSelectedStudent)
      .subscribe(
        data => {
          this.timeTable = data;
        },
        error => {
          console.error(error);
          // this.timeTable = {"id":2,"timetableDays":[{"id":50,"dayId":1,"dayName":"Monday","periods":[{"id":92,"start":"06:00:00","end":"08:10:00","subjectId":{"id":1,"name":"Subejct 37364","code":"Sub_37364","type":"SUBJECT"},"teacherId":1},{"id":93,"start":"08:10:00","end":"09:50:00","subjectId":{"id":2,"name":"Subejct 85057","code":"Sub_85057","type":"SUBJECT"},"teacherId":1},{"id":94,"start":"09:50:00","end":"12:00:00","subjectId":{"id":3,"name":"Subejct 31912","code":"Sub_31912","type":"SUBJECT"},"teacherId":1},{"id":95,"start":"12:00:00","end":"14:30:00","subjectId":{"id":4,"name":"Subejct 38574","code":"Sub_38574","type":"SUBJECT"},"teacherId":1}]},{"id":51,"dayId":2,"dayName":"Tuesday","periods":[{"id":97,"start":"08:10:00","end":"09:50:00","subjectId":{"id":2,"name":"Subejct 85057","code":"Sub_85057","type":"SUBJECT"},"teacherId":1},{"id":98,"start":"09:50:00","end":"12:00:00","subjectId":{"id":3,"name":"Subejct 31912","code":"Sub_31912","type":"SUBJECT"},"teacherId":1},{"id":99,"start":"12:00:00","end":"14:30:00","subjectId":{"id":4,"name":"Subejct 38574","code":"Sub_38574","type":"SUBJECT"},"teacherId":1},{"id":96,"start":"06:00:00","end":"08:10:00","subjectId":{"id":1,"name":"Subejct 37364","code":"Sub_37364","type":"SUBJECT"},"teacherId":1}]},{"id":52,"dayId":3,"dayName":"Wednesday","periods":[{"id":100,"start":"06:00:00","end":"08:10:00","subjectId":{"id":1,"name":"Subejct 37364","code":"Sub_37364","type":"SUBJECT"},"teacherId":1},{"id":101,"start":"08:10:00","end":"09:50:00","subjectId":{"id":2,"name":"Subejct 85057","code":"Sub_85057","type":"SUBJECT"},"teacherId":1},{"id":102,"start":"09:50:00","end":"12:00:00","subjectId":{"id":3,"name":"Subejct 31912","code":"Sub_31912","type":"SUBJECT"},"teacherId":1},{"id":103,"start":"12:00:00","end":"14:30:00","subjectId":{"id":4,"name":"Subejct 38574","code":"Sub_38574","type":"SUBJECT"},"teacherId":1}]},{"id":53,"dayId":4,"dayName":"Thursday","periods":[{"id":104,"start":"06:00:00","end":"08:10:00","subjectId":{"id":1,"name":"Subejct 37364","code":"Sub_37364","type":"SUBJECT"},"teacherId":1},{"id":105,"start":"08:10:00","end":"09:50:00","subjectId":{"id":2,"name":"Subejct 85057","code":"Sub_85057","type":"SUBJECT"},"teacherId":1},{"id":106,"start":"09:50:00","end":"12:00:00","subjectId":{"id":3,"name":"Subejct 31912","code":"Sub_31912","type":"SUBJECT"},"teacherId":1},{"id":107,"start":"12:00:00","end":"14:30:00","subjectId":{"id":4,"name":"Subejct 38574","code":"Sub_38574","type":"SUBJECT"},"teacherId":1}]},{"id":54,"dayId":5,"dayName":"Friday","periods":[{"id":108,"start":"06:00:00","end":"08:10:00","subjectId":{"id":1,"name":"Subejct 37364","code":"Sub_37364","type":"SUBJECT"},"teacherId":1},{"id":109,"start":"08:10:00","end":"09:50:00","subjectId":{"id":2,"name":"Subejct 85057","code":"Sub_85057","type":"SUBJECT"},"teacherId":1},{"id":110,"start":"09:50:00","end":"12:00:00","subjectId":{"id":3,"name":"Subejct 31912","code":"Sub_31912","type":"SUBJECT"},"teacherId":1},{"id":111,"start":"12:00:00","end":"14:30:00","subjectId":{"id":4,"name":"Subejct 38574","code":"Sub_38574","type":"SUBJECT"},"teacherId":1}]},{"id":55,"dayId":6,"dayName":"Saturday","periods":[{"id":113,"start":"08:10:00","end":"09:50:00","subjectId":{"id":2,"name":"Subejct 85057","code":"Sub_85057","type":"SUBJECT"},"teacherId":1},{"id":114,"start":"09:50:00","end":"12:00:00","subjectId":{"id":3,"name":"Subejct 31912","code":"Sub_31912","type":"SUBJECT"},"teacherId":1},{"id":115,"start":"12:00:00","end":"14:30:00","subjectId":{"id":4,"name":"Subejct 38574","code":"Sub_38574","type":"SUBJECT"},"teacherId":1},{"id":112,"start":"06:00:00","end":"08:10:00","subjectId":{"id":1,"name":"Subejct 37364","code":"Sub_37364","type":"SUBJECT"},"teacherId":1}]}],"status":"A","batchId":{"id":2,"name":"Batch 65789","code":"Batch 65789"},"courseId":{"id":1,"name":"Course 81157","code":"Course 81157"}};
        }
      );
  }

  // get class teacherId by studentId
  getTeacherDeatilsBasedOnStudentId() {
    this.leaveService
      .findTeacherDetailsByStudentId(this.currentSelectedStudent)
      .subscribe(
        data => {
          this.reportingTeacher = data;
        },
        error => {
          console.error(error);
          // this.reportingTeacher = {"id":1,"name":"Anjit Kumar","gender":"Male","mobile":"9871817403","email":"anjit.kr@gmail.com","subjects":[],"documents":{},"designationId":{"id":1,"name":"Teacher"},"departmentId":{"id":4,"name":"School"},"imageId":42};
        }
      );
  }

  ionViewDidLoad() {
    this.findStudentListBasedOnGuardianId();
    // this.profileService.findProfileDetails(this.session.findRemote(),this.session.findModule())
    // .subscribe(data=>{
    //     this.isLoaded = true;
    //     this.profile = Object.assign(this.profile, data);
    //    this.fetchPendingRequests();
    //    this.fetchMyRequests();
    // });
  }

  onView(viewName: string) {
    this.navContrle.push(viewName);
  }
}