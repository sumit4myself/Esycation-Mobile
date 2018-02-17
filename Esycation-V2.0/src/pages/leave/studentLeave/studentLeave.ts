import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentLeaveService } from '../../../providers/service/leave/student.leave.service';
import { Leave } from '../../../providers/model/leave/model.leave'
import * as moment from 'moment';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { PagedResponse } from '../../../providers/model/common/PaggedResponse';
import { BaseComponent } from '../../baseComponent/base.component';
import { CommonServices } from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'student-leave',
  templateUrl: 'studentLeave.html'
})
export class StudentLeaveComponent extends BaseComponent {

  leaveForm: FormGroup;
  mySelectOptions: any = {};
  students: PagedResponse = PagedResponse.getInstance();
  totalLeaveError: string = null;
  formSubmitAttempt: boolean;
  constructor(
    protected navCtrl: NavController,
    private formBuilder: FormBuilder,
    private leaveService: StudentLeaveService,
    private session: UserSessionService,
    private commonServices: CommonServices) {

    super(session, navCtrl);
    this.buildForm();

    this.mySelectOptions = {
      mode: 'ios',
      cssClass: 'remove-ok'
    }
  }


  buildForm() {

    this.leaveForm = this.formBuilder.group({
      fromDate: ['', [<any>Validators.required]],
      toDate: ['', [<any>Validators.required]],
      comment: ['', [<any>Validators.required]],
      studentId: ['', [<any>Validators.required]],
      totalLeave: '',
    });

    this.leaveService.findStudentByGuardianIds(this.session.findRemote()).subscribe(data => {
      this.students = Object.assign(this.students, data);
      if (this.students.contents.length == 1) {
        this.leaveForm.setValue({
          fromDate: null,
          toDate: null,
          comment: null,
          studentId: this.students.contents[0].id,
          totalLeave: null,
        })
      }

    });
  }

  onApply({ value, valid }: { value: Leave, valid: boolean }) {

    this.formSubmitAttempt=true;
    let leaveDetails = this.preapreData(value);
    this.commonServices.onLoader();
    if (this.validate(valid, leaveDetails)) {
      this.leaveService.saveLeave(leaveDetails).subscribe(data => {
        this.commonServices.presentToast("Data saved successfully", null, "success");
        this.commonServices.onDismissAll();
        if (data) {
        }
        this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));
      }, error => {
        console.error("Error :", error);
        this.commonServices.onDismissAll();
      });
    }

  }

  preapreData(leave: Leave): Leave {

    leave.status = null;
    leave.studentId = leave.studentId;
    leave.fromDate = moment(leave.fromDate).format("MM/DD/YYYY");
    leave.toDate = moment(leave.toDate).format("MM/DD/YYYY");
    leave.totalLeave = moment(leave.toDate).diff(moment(leave.fromDate), 'days');
    return leave;
  }

  validate(validate: boolean, data: Leave): Boolean {

    if (!validate)
      return false;
    else if (moment(data.toDate).diff(moment(data.fromDate), 'days') < 0) {
      this.totalLeaveError = "Invalid date range."
      return false;
    }
    else {
      return true;
    }
  }

}
