import { Component } from '@angular/core';
import {IonicPage, NavController,LoadingController, Loading} from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {LeaveService} from '../../../providers/service/leave/leave.service';
import {StaffLeaveDetailsInterface} from '../../../providers/model/leave/model.staffLeave';
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
 constructor(
    private navCtrl: NavController,
    private formBuilder:FormBuilder,
    private leaveService:LeaveService,
    private loadingCtrl:LoadingController,
    private session:UserSessionService) {

     console.log("StaffId==",this.session.findRemote());
      this.buildForm();  
    }
 
  
    buildForm(){

      this.leaveForm = this.formBuilder.group({
        fromDate: ['', [<any>Validators.required]],
        toDate: ['', [<any>Validators.required]],
        comment: ['',[<any>Validators.required]],
        totalLeave: ['',[<any>Validators.required]],
      });

    }
    
    onApply({value,valid}:{value:StaffLeaveDetailsInterface,valid:boolean}){

      console.log("valid==",valid)
      
      this.loading = this.loadingCtrl.create({
        content: 'Saving..'
      }); this.loading.present();
      value.approvalStatus=null;
      value.fromDate=moment(value.fromDate).format("MM/DD/YYYY");
      value.toDate=moment(value.toDate).format("MM/DD/YYYY");
      value.totalLeave = moment(value.toDate).diff(moment(value.fromDate),'days');

      console.log("Staff Leave==",JSON.stringify(value));

      this.leaveService.saveStaffLeave(value).subscribe(data=>{
        if(data){
          console.log("Leave Service Save :",data);
        }
        this.loading.dismissAll();
        this.navCtrl.setRoot("HomeComponent");
      },error=>{
        console.log("Error :",error);
      });
    }

}
