import { Component } from '@angular/core';
import { NavController,Events,LoadingController, Loading} from 'ionic-angular';
//import {LeaveService} from '../../../shared/services/leave/leave.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
//import {Leave} from '../../../shared/models/leave/model.leave';
//import {HomeComponent} from '../../default/home/home.componet';
import * as moment from 'moment';

@Component({
  selector: 'leave-page',
  templateUrl: 'leave.html'
})
export class LeaveComponent {

 leaveForm: FormGroup;
 loading: Loading;
 constructor(
    private navCtrl: NavController,
    private events:Events,
    private formBuilder:FormBuilder,
    //private leaveService:LeaveService,
    private loadingCtrl:LoadingController) {

      this.buildForm();
    }
 


    buildForm(){

      this.leaveForm = this.formBuilder.group({
        fromDate: ['', [<any>Validators.required]],
        toDate: ['', [<any>Validators.required]],
        leaveType: ['',[<any>Validators.required]],
        comment: ['',[<any>Validators.required]],
        studentId: ['',[<any>Validators.required]],
        totalLeave: ['',[<any>Validators.required]],
      });

    }

    /*
    onApply({value,valid}:{value:Leave,valid:boolean}){

      this.loading = this.loadingCtrl.create({
        content: 'Saving..'
      }); this.loading.present();
      value.status="PENDING"
      value.studentId=1;
      value.fromDate=moment(value.fromDate).format("MM/DD/YYYY");
      value.toDate=moment(value.toDate).format("MM/DD/YYYY");
      value.totalLeave = moment(value.toDate).diff(moment(value.fromDate),'days');


      console.log("Leave==",JSON.stringify(value));

      this.leaveService.save(value).subscribe(save=>{
        this.loading.dismissAll();
        this.navCtrl.setRoot(HomeComponent);
      },
      error=>{
        this.loading.dismissAll();
      }
    );
    }
*/
}
