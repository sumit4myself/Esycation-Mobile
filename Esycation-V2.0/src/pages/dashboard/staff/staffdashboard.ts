import { Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {Profile} from '../../../providers/model/profile/model.profile';
import {ServerConfig} from '../../../providers/config'; 
import {BaseComponent} from '../../baseComponent/base.component';
import {ApprovelService} from '../../../providers/service/approvel/approvel.service';


@IonicPage()
@Component({
    selector: 'staffdashboard-page',
    templateUrl: 'staffdashboard.html'
})
export class StaffDashboardComponent extends BaseComponent {

    isLoaded:boolean=false;
    
    isMyRequestLoaded:boolean=false;
    isPendingRequestLoaded:boolean=false;
    mypendingrequest:Array<Object> = new Array<Object>();
    myrequest:Array<Object> = new Array<Object>();
    myrequests: string = "pendings";
    profile:Profile=Profile.getInstance()
    imagePath:String=ServerConfig.imagePath();
   
    constructor(protected navControl:NavController,
        protected session:UserSessionService,
        private approvelService:ApprovelService,
        private profileService:ProfileService )
        {
            super(session,navControl)
      }


    fetchPendingRequests(){
        this.isPendingRequestLoaded=false;
        this.mypendingrequest = [];
        this.approvelService.findPending(this.session.findUserId()).subscribe(
            data=>{
             for(let group of data.contents) {
                 let obj = Object.assign({},group);
                 this.mypendingrequest.push(obj);
             }
            console.log(this.mypendingrequest)
            this.isPendingRequestLoaded=true;
        },error=>{
            console.error(error);
            this.isPendingRequestLoaded=true;
       });
    }  

    fetchMyRequests(){
        this.myrequest = [];
        this.isMyRequestLoaded=false;
        this.approvelService.findMyRequests(this.session.findUserId()).subscribe(
            data=>{
             for(let group of data.contents) {
                 let obj = Object.assign({},group);
                 this.myrequest.push(obj);
             }
             this.isMyRequestLoaded=true;
        },error=>{
            console.error(error);
            this.isMyRequestLoaded=true;
       });
    }  

    ionViewDidLoad(){
        this.profileService.findProfileDetails(this.session.findRemote(),this.session.findModule())
        .subscribe(data=>{
           this.profile = Object.assign(this.profile, data);
           this.isLoaded = true;
           this.fetchPendingRequests();
           this.fetchMyRequests();
        });
    }

    onView(viewName:string){

        this.navControl.setRoot(viewName);
   }

   onPendingRequest(model,id){
           
    if(model=="STUDENT_LEAVE"){
        this.navControl.push("ApproveStudentLeaveComponent",{id:id});
    }
    
   }

}


