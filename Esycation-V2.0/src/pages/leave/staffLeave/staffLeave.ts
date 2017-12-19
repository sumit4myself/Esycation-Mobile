import { Component } from '@angular/core';
import {IonicPage, NavController,LoadingController, Loading} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {LeaveService} from '../../../providers/service/leave/leave.service';
import {StaffLeaveDetailsInterface,StaffLeave,StaffLeaveDetails} from '../../../providers/model/leave/model.staffLeave';
import * as moment from 'moment';
import {UserSessionService} from "../../../providers/service/core/user.session.service";
@IonicPage()
@Component({
  selector: 'staffleave-page',
  templateUrl: 'staffLeave.html'
})
export class StaffLeaveComponent {

 leaveForm: FormGroup;
 loading: Loading;
 leaveTypes:any;
 mySelectOptions : any={};  
 constructor(
    private navCtrl: NavController,
    private formBuilder:FormBuilder,
    private leaveService:LeaveService,
    private loadingCtrl:LoadingController,
    
    private session:UserSessionService) {

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
        staffLeaves:this.formBuilder.array([]),
      });

      this.leaveService.findRemaining(this.session.findRemote()).subscribe(data=>{
        
        let types = this.prepareLeaveType(data);
        const t = types.map(t => this.formBuilder.group(t));
        const leaveType = this.formBuilder.array(t);
        this.leaveForm.setControl('staffLeaves', leaveType);
        this.leaveTypes = types;
      });

    
    }
    
    onApply({value,valid}:{value:StaffLeaveDetailsInterface,valid:boolean}){

      console.log("valid==",valid)
      
      this.loading = this.loadingCtrl.create({
        content: 'Saving..'
      }); this.loading.present();
      value.approvalStatus=null;
      value.staffId = this.session.findRemote();
      value.fromDate=moment(value.fromDate).format("MM/DD/YYYY");
      value.toDate=moment(value.toDate).format("MM/DD/YYYY");
      value.totalLeave = moment(value.toDate).diff(moment(value.fromDate),'days');
      for(let leave of value.staffLeaves){
        if(leave.fromDate){
          leave.fromDate = moment(leave.fromDate).format("MM/DD/YYYY");
          leave.toDate = moment(leave.toDate).format("MM/DD/YYYY");
        }
      }
      
      console.log("Staff==",JSON.stringify(this.PrepareData(value)));

      this.leaveService.saveStaffLeave(this.PrepareData(value)).subscribe(data=>{
        if(data){
          console.log("Leave Service Save :",data);
        }
        this.loading.dismissAll();
        this.navCtrl.setRoot("HomeComponent");
      },error=>{
        console.log("Error :",error);
      });

    }

    prepareLeaveType(data:any):Array<StaffLeave>{

      let staffLeaves=new Array<StaffLeave>();
      for(let leave of data.leaves){
        let leaveType = new StaffLeave();
        leaveType.id=null;
        leaveType.totalLeave = 0;
        leaveType.type=leave.type;
        leaveType.remainingLeave = leave.totalLeave;
        staffLeaves.push(leaveType);
      }
      return staffLeaves;

    }

    PrepareData(data:StaffLeaveDetailsInterface):StaffLeaveDetails{

      let staff = new StaffLeaveDetails();
      let staffLeaves=new Array<StaffLeave>();
      staff.staffId=data.staffId;
      staff.comment=data.comment;
      staff.fromDate = data.fromDate;
      staff.toDate = data.toDate;
      staff.totalLeave = data.totalLeave;
      for(let leave of data.staffLeaves){
        if(leave.fromDate){
          let leaveType = new StaffLeave();
          leaveType.fromDate = leave.fromDate;
          leaveType.toDate = leave.toDate;
          leaveType.totalLeave=leave.totalLeave;
          leaveType.type = leave.type;
          staffLeaves.push(leaveType)
        }
      }
      staff.staffLeaves =staffLeaves; 
      return staff;
    }

}
