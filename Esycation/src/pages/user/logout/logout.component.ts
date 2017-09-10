import { Component } from '@angular/core';
import { NavController,LoadingController, Loading } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {CommonServices} from '../../../shared/services/common/common.service';
import {LoginService} from '../../../shared/services/userauth/login.auth';
import {UserAuth} from '../../../shared/services/core/auth.service'
import {HomeComponent} from '../../default/home/home.componet';
import {LoginComponent} from '../login/login.component';
import {UserPrefernce} from '../../../shared/models/baseModel/BaseModels';

@Component({
  selector: 'home-page',
  templateUrl: '../../default/home/home.html'
})
export class LogoutComponent {

     loading: Loading;
     activeUserDetail:UserPrefernce;
    constructor(
        private navCtrl: NavController,
        private loadingCtrl:LoadingController,
        private auth:UserAuth,
        private loginService:LoginService,
        private commonServices:CommonServices) {
            this.activeUserDetail = this.commonServices.currentUser();
        }

        ionViewDidLoad() {

            this.loading = this.loadingCtrl.create({
            content: 'Logout...'
            }); this.loading.present();
            this.auth.logOut(this.activeUserDetail.userId);
            this.loading.dismissAll();
            let userId = localStorage.getItem('$LoopBackSDK$userId');
            if(userId){
                this.navCtrl.setRoot(HomeComponent);
            }   
            else{
                this.navCtrl.setRoot(LoginComponent);
            }
        }    
 
}
