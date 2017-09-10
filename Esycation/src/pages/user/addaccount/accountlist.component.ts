import { Component } from '@angular/core';
import { NavController,ViewController,ModalController, LoadingController, Loading, Slides, Events } from 'ionic-angular';
import {CommonServices} from '../../../shared/services/common/common.service';
import {AddAcountComponent} from '../addaccount/add.account.component';
import {HomeComponent} from '../../default/home/home.componet';
import {ProfileComponent} from '../../profile/profile.component';
import {AddAcccountService} from '../../../shared/services/add-account/add.account.service';
import {UserPrefernce} from '../../../shared/models/baseModel/BaseModels';

@Component({
  selector: 'page-account',
  templateUrl: 'accountlist.html'
})
export class AccountListComponent {

 
  loading: Loading;
  users:Array<any>;
  activeUserDetail:UserPrefernce;
  constructor( 
    private navCtrl: NavController,
    private modal :ModalController,
    private viewCtrl:ViewController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private commonServices :CommonServices,
    private events: Events,
    private acccountService:AddAcccountService) {
      this.activeUserDetail=this.commonServices.currentUser();
    }


   gotoProfile(userId:number) {

    this.navCtrl.push(ProfileComponent,{id:userId});
  }

  ionViewDidLoad(){
    this.users = this.acccountService.findLoggedInUsers();
  }

  onAddAcount() {
    let modal = this.modalCtrl.create(AddAcountComponent);
      modal.onDidDismiss(isaddAccount => {
        if(isaddAccount){
          this.events.publish('isLoggedIn');
          this.navCtrl.setRoot(AccountListComponent);
        }
      });
    modal.present();
  }
  
  onSwitchAccount(userId:number){
    this.events.publish('isLoggedIn');
    let isSwitch= this.acccountService.switchAccount(userId);
  }
  onlogOut(userId:number){
    this.acccountService.logout(userId);
    this.events.publish('isLoggedIn');
    this.navCtrl.setRoot(AccountListComponent);
  }
  onViewProfile(userId:number){
    console.log("onViewProfile...",userId);
    this.navCtrl.push(ProfileComponent,{id:userId});
  }

  
}
