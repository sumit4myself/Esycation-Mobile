import { Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {Profile} from '../../../providers/model/profile/model.profile';
import {ServerConfig} from '../../../providers/config'; 
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';



@IonicPage()
@Component({
    selector: 'staffdashboard-page',
    templateUrl: 'staffdashboard.html'
})
export class StaffDashboardComponent {

    isLoaded:boolean=false;
    
    isMyRequestLoaded:boolean=false;
    isPendingRequestLoaded:boolean=false;
    mypendingrequest:Array<Object> = new Array<Object>();
    myrequest:Array<Object> = new Array<Object>();
    myrequests: string = "pendings";
    profile:Profile=Profile.getInstance()
    imagePath:String=ServerConfig.imagePath();
   
    constructor(private navContrle:NavController,
        private session:UserSessionService,
        private bulkNotificationService:BulkNotificationService,
        private profileService:ProfileService )
        {
        
      }


    fetchPendingRequests(){
        this.isPendingRequestLoaded=false;
        this.mypendingrequest = [];
        this.bulkNotificationService.findPending(this.session.findUserId()).subscribe(
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
        this.bulkNotificationService.findMyRequests(this.session.findUserId()).subscribe(
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

        this.navContrle.setRoot(viewName);
   }

}


