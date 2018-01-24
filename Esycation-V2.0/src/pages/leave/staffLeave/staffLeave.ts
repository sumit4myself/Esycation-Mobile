import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {StaffLeaveService} from '../../../providers/service/leave/staff.leave.service';
import {StaffLeaveDetailsInterface,StaffLeaveDetails} from '../../../providers/model/leave/model.staffLeave';
import * as moment from 'moment';
import {UserSessionService} from "../../../providers/service/core/user.session.service";
import {BaseComponent} from '../../baseComponent/base.component';
import {CommonServices} from '../../../providers/service/common/common.service';
import {StaffLeaveDefinition,Type} from '../../../providers/model/leave/model.staff.leave.defination';


@IonicPage()
@Component({
  selector: 'staffleave-page',
  templateUrl: 'staffLeave.html'
})
export class StaffLeaveComponent extends BaseComponent {

 leaveForm: FormGroup;
 leaveType:StaffLeaveDefinition=new StaffLeaveDefinition();
 mySelectOptions : any={};  
 constructor(
    protected navCtrl: NavController,
    private formBuilder:FormBuilder,
    private leaveService:StaffLeaveService,
    protected session:UserSessionService,
    private commonServices:CommonServices) {

      super(session,navCtrl);
      this.buildForm();  
      this.mySelectOptions = {
        mode :'ios',
        cssClass: 'remove-ok'
      }

    }
 
  
    buildForm(){

      this.leaveForm = this.formBuilder.group({
        
        staffId:'',
        comment: ['',[<any>Validators.required]],
        fromDate: ['', [<any>Validators.required]],
        toDate: ['', [<any>Validators.required]],
        totalLeave: ['',[<any>Validators.required]],
        approvalStatus:'',
        approverComment:'',
        type:'',
      });

      this.leaveService.findRemaining(this.session.findRemote()).subscribe(data=>{
        this.leaveType = Object.assign({},data);;
      },error=>{
        console.error("Error :",error);
      });
    
    }
    
    onApply({value,valid}:{value:StaffLeaveDetailsInterface,valid:boolean}){

      console.log("valid==",valid);
      this.commonServices.onLoader();
      //console.log("Staff==",JSON.stringify(this.PrepareData(value)));
      this.leaveService.saveStaffLeave(this.PrepareData(value)).subscribe(data=>{
        this.commonServices.presentToast("Data saved successfully",null,"success");
        this.commonServices.onDismissAll();
        if(data){}
        this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));
      },error=>{
        this.commonServices.onDismissAll();
        console.error("Error :",error);
      });
  
    }

    PrepareData(data:StaffLeaveDetailsInterface):StaffLeaveDetails{

      let staffLeaveDetails = new StaffLeaveDetails();
      let type=new Type();
    
      staffLeaveDetails.approvalStatus=null;
      staffLeaveDetails.staffId = this.session.findRemote();
      staffLeaveDetails.fromDate=moment(data.fromDate).format("MM/DD/YYYY");
      staffLeaveDetails.toDate=moment(data.toDate).format("MM/DD/YYYY");
      staffLeaveDetails.totalLeave = moment(data.toDate).diff(moment(data.fromDate),'days');
      staffLeaveDetails.comment = data.comment;
      type.id=data.type;
      staffLeaveDetails.type=type;

      return staffLeaveDetails;
    }

}
