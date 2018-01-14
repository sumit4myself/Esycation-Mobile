import { Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {Profile} from '../../../providers/model/profile/model.profile';
import {ServerConfig} from '../../../providers/config'; 
import {ApprovelService} from '../../../providers/service/approvel/approvel.service';

@IonicPage()
@Component({
    selector: 'studentdashboard-page',
    templateUrl: 'studentdashboard.html'
})
export class StudentDashboardComponent {
   
    profile:Profile=Profile.getInstance()
    imagePath:String=ServerConfig.imagePath();
   
    isLoaded:boolean=false;
    isMyRequestLoaded:boolean=false;
    isPendingRequestLoaded:boolean=false;
    mypendingrequest:Array<Object> = new Array<Object>();
    myrequest:Array<Object> = new Array<Object>();
    myrequests: string = "pendings";

    constructor(private navContrle:NavController,
        private session:UserSessionService,
        private profileService:ProfileService,
        private approvelService:ApprovelService )
        {
          
        }
      
    ionViewDidLoad(){
        this.profileService.findProfileDetails(this.session.findRemote(),this.session.findModule())
        .subscribe(data=>{
            this.isLoaded = true;
            this.profile = Object.assign(this.profile, data);
            this.fetchPendingRequests();
            this.fetchMyRequests();
        });
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
 

    onView(viewName:string){

        this.navContrle.push(viewName);
   }

}


