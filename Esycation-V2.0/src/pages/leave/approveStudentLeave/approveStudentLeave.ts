import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserSessionService } from "../../../providers/service/core/user.session.service";
import { BaseComponent } from '../../baseComponent/base.component';
import { CommonServices } from '../../../providers/service/common/common.service';
import { RequestDetails} from '../../../providers/model/leave/model.approveLeave';
import {ApprovelService} from '../../../providers/service/approvel/approvel.service'; 

@IonicPage()
@Component({
  selector: 'approve-student-leave',
  templateUrl: 'approveStudentLeave.html'
})
export class ApproveStudentLeaveComponent extends BaseComponent {

  requestDetails:RequestDetails=new RequestDetails();
  comment:string=null;
  constructor(
    protected navCtrl: NavController,
    private session: UserSessionService,
    private commonServices: CommonServices,
    private approvelService:ApprovelService,
    private navParam: NavParams) {

    super(session, navCtrl);

    console.log(this.session);

  }

  ionViewDidLoad() {
  
    let id = this.navParam.get("id");
    console.log("targetId===", id);
    this.commonServices.onLoader();
    this.approvelService.findRequest(id).subscribe(data=>{
      let d = Object.assign({}, data);
      this.requestDetails=d;
      this.commonServices.onDismissAll();
    },error=>{
      this.commonServices.onDismissAll();
      console.error("ERROR :",error)
    });

  }


  onApprove() {

    if(this.comment){

      this.approvelService.approve(this.requestDetails.taskId,this.comment).subscribe(data=>{
        console.log(data);
        this.commonServices.presentToast("Data saved successfully",null,"success");
        this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));  
      },error=>{
        console.error("ERROR :",error);
      });
    }else{
      this.commonServices.presentToast("Please enter Comment",null,"error");
    }

  }

  onReject() {

    if(this.comment){

      this.approvelService.reject(this.requestDetails.taskId,this.comment).subscribe(data=>{
        console.log(data);
        this.commonServices.presentToast("Data saved successfully",null,"success");
        this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));  
      },error=>{
        console.error("ERROR :",error);
      });
    }else{
      this.commonServices.presentToast("Please enter Comment",null,"error");
    }
  }

}
