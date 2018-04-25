import { Component } from "@angular/core";
import { NavController, IonicPage, NavParams } from "ionic-angular";
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from "../../baseComponent/base.component";
import { CommonServices } from "../../../providers/service/common/common.service";
import { ServerConfig } from "../../../providers/config";
import { Batch } from "../../../providers/service/schools/batch/batch.model";
import { Course } from "../../../providers/service/schools/course/course.model";
import { Student } from "../../../providers/service/students/student/student.model";
import { BatchService } from "../../../providers/service/schools/batch/batch.service";
import { CourseService } from "../../../providers/service/schools/course/course.service";
import { StudentService } from "../../../providers/service/students/student/student.service";

@IonicPage()
@Component({
  selector: "view-student",
  templateUrl: "viewStudent.html"
})
export class ViewStudentComponent extends BaseComponent {
  batchs: Array<Batch> = new Array<Batch>();
  cources: Array<Course> = new Array<Course>();
  students: Array<Student> = new Array<Student>();
  dataLength: number = null;
  imagePath: String = ServerConfig.browseFilePath();
  selectOptionStyle: any = {};
  constructor(
    protected navCtrl: NavController,
    private navParam: NavParams,
    protected userSessionService: UserSessionService,
    private commonServices: CommonServices,
    private courseService: CourseService,
    private batchService: BatchService,
    private studentService: StudentService
  ) {
    super(userSessionService, navCtrl);
    console.log(this.navParam, this.commonServices);
  }

  ionViewDidLoad() {
    this.initCources();
    this.selectOptionStyle = {
      mode: "ios",
      cssClass: "remove-ok"
    };
  }

  initCources() {
    this.commonServices.onLoader();
    this.courseService.findAll().subscribe(
      data => {
        for (let cource of data.contents) {
          let obj = Object.assign({}, cource);
          this.cources.push(obj);
        }
        this.commonServices.onDismissAll();
      },
      error => {
        console.error(error);
        this.commonServices.onDismissAll();
      }
    );
  }

  onChangeByCourse(id: number) {
    this.commonServices.onLoader();
    this.batchs = [];
    this.students = [];
    this.dataLength = null;
    this.batchService.findByCourseIds(id.toString()).subscribe(
      data => {
        for (let batch of data.contents) {
          let obj = Object.assign({}, batch);
          this.batchs.push(obj);
        }
        this.commonServices.onDismissAll();
      },
      error => {
        console.error(error);
        this.commonServices.onDismissAll();
      }
    );
  }

  onChangeByBatch(id: number) {
    this.commonServices.onLoader();
    this.students = [];
    this.studentService
      .findByBatchIds(id.toString(), 1, 100, "Student.MinDetails")
      .subscribe(
        data => {
          for (let student of data.contents) {
            let obj = Object.assign({}, student);
            this.students.push(obj);
          }
          if (this.students.length == 0) {
            this.dataLength = 0;
          } else {
            this.dataLength = null;
          }
          this.commonServices.onDismissAll();
        },
        error => {
          console.error(error);
          this.commonServices.onDismissAll();
        }
      );
  }
}
