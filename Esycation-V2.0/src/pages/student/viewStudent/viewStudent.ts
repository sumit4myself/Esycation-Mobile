import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';
import { CommonServices } from '../../../providers/service/common/common.service';
import { ServerConfig } from '../../../providers/config';
import { CourceService } from '../../../providers/service/cource/cource.service';
import { BatchService } from '../../../providers/service/batch/batch.service';
import { Batch } from '../../../providers/model/batch/model.batch';
import { Cource } from '../../../providers/model/cources/model.cource';
import { Student } from '../../../providers/model/student/model.student';
import { StudentService } from '../../../providers/service/student/student.service';


@IonicPage()
@Component({
  selector: 'view-student',
  templateUrl: 'viewStudent.html'
})

export class ViewStudentComponent extends BaseComponent {

  batchs: Array<Batch> = new Array<Batch>();
  cources: Array<Cource> = new Array<Cource>();
  students: Array<Student> = new Array<Student>();
  dataLength: number = null;
  imagePath: String = ServerConfig.imagePath();
  selectOptionStyle: any = {};
  constructor(
    protected navCtrl: NavController,
    private navParam: NavParams,
    protected userSessionService: UserSessionService,
    private commonServices: CommonServices,
    private courceService: CourceService,
    private batchService: BatchService,
    private studentService: StudentService) {
    super(userSessionService, navCtrl);

    console.log(this.navParam, this.commonServices);
  }

  ionViewDidLoad() {
    this.initCources();

    this.selectOptionStyle = {
      mode: 'ios',
      cssClass: 'remove-ok'
    }
  }


  initCources() {

    this.commonServices.onLoader();
    this.courceService.findAllowedCourses("Course.NameId").subscribe(data => {
      for (let cource of data.contents) {
        let obj = Object.assign({}, cource);
        this.cources.push(obj);
      }
      this.commonServices.onDismissAll();
    }, error => {
      console.error(error);
      this.commonServices.onDismissAll();
    });
  }

  onChangeByCourse(id: number) {

    this.commonServices.onLoader();
    this.batchs = [];
    this.students = [];
    this.dataLength=null;
    this.batchService.findBatchAllowedByCourseIds(id, "Batch.NameId").subscribe(data => {
      for (let batch of data.contents) {
        let obj = Object.assign({}, batch);
        this.batchs.push(obj);
      }
      this.commonServices.onDismissAll();
    }, error => {
      console.error(error);
      this.commonServices.onDismissAll();
    });
  }

  onChangeByBatch(batchId: number) {

    this.commonServices.onLoader();
    this.students = [];
    this.studentService.findByBatchIds(batchId, "Student.MinDetails").subscribe(data => {
      for (let student of data.contents) {
        let obj = Object.assign({}, student);
        this.students.push(obj);
      }
      if(this.students.length==0){
        this.dataLength=0
      }else{
        this.dataLength=null;
      }
      this.commonServices.onDismissAll();
    }, error => {
      console.error(error);
      this.commonServices.onDismissAll();
    });
  }

}
