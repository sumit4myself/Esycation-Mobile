import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffLeaveService } from '../../../providers/service/leave/staff.leave.service';
import { StaffLeaveDetailsInterface, StaffLeaveDetails, ErrorValidate } from '../../../providers/model/leave/model.staffLeave';
import * as moment from 'moment';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';
import { CommonServices } from '../../../providers/service/common/common.service';
import { StaffLeaveDefinition, Type } from '../../../providers/model/leave/model.staff.leave.defination';


@IonicPage()
@Component({
  selector: 'staffleave-page',
  templateUrl: 'staffLeave.html'
})
export class StaffLeaveComponent extends BaseComponent {

  leaveForm: FormGroup;
  leaveType: StaffLeaveDefinition = new StaffLeaveDefinition();
  error: ErrorValidate = new ErrorValidate();
  mySelectOptions: any = {};
  formSubmitAttempt: boolean;
  constructor(
    protected navCtrl: NavController,
    private formBuilder: FormBuilder,
    private leaveService: StaffLeaveService,
    protected session: UserSessionService,
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

      staffId: '',
      comment: ['', [<any>Validators.required]],
      fromDate: ['', [<any>Validators.required]],
      toDate: ['', [<any>Validators.required]],
      totalLeave: '',
      approvalStatus: '',
      approverComment: '',
      type: '',
    });

    this.leaveService.findRemaining(this.session.findRemote()).subscribe(data => {
      this.leaveType = Object.assign({}, data);
    }, error => {
      console.error("Error :", error);
    });

  }

  onApply({ value, valid }: { value: StaffLeaveDetailsInterface, valid: boolean }) {

    this.commonServices.onLoader();
    this.formSubmitAttempt=true;
    if (this.validate(valid, value)) {
      this.leaveService.saveStaffLeave(this.PrepareData(value)).subscribe(data => {
        this.commonServices.presentToast("Data saved successfully", null, "success");
        this.commonServices.onDismissAll();
        if (data) { }
        this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));
      }, error => {
        this.commonServices.onDismissAll();
        console.error("Error :", error);
      });
    }
  }

  PrepareData(data: StaffLeaveDetailsInterface): StaffLeaveDetails {

    let staffLeaveDetails = new StaffLeaveDetails();
    let type = new Type();

    staffLeaveDetails.approvalStatus = null;
    staffLeaveDetails.staffId = this.session.findRemote();
    staffLeaveDetails.fromDate = moment(data.fromDate).format("MM/DD/YYYY");
    staffLeaveDetails.toDate = moment(data.toDate).format("MM/DD/YYYY");
    staffLeaveDetails.totalLeave = moment(data.toDate).diff(moment(data.fromDate), 'days');
    staffLeaveDetails.comment = data.comment;
    type.id = data.type;
    staffLeaveDetails.type = type;

    return staffLeaveDetails;
  }

  validate(validate: boolean, data: StaffLeaveDetailsInterface): Boolean {

    let isError = true;
    let total = moment(data.toDate).diff(moment(data.fromDate), 'days');
    if (!validate)
      return false;

    if (!data.type) {
      isError = false;
      this.error.type = "This field is required";
    } else if (data.type) {
      for(let leave of this.leaveType.leaves){
         if(leave.id==data.type){
           if(total>leave.totalLeave){
            this.error.type = "You do not have "+total+" "+leave.type.name;
            this.error.totalLeave =null;
            isError = false;
            break;
           }
         }
      }
      if(total<0){
        this.error.totalLeave = "Invalid date range.";
        this.error.type=null;
        isError = false;
      }
    }
    return isError;
  }

}
