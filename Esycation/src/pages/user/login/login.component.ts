import { Component } from '@angular/core';
import { ViewController,NavController, ModalController, LoadingController, Loading,Events } from 'ionic-angular';
import {HomeComponent} from '../../default/home/home.componet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {CommonServices} from '../../../shared/services/common/common.service';
import {LoginService} from '../../../shared/services/userauth/login.auth';
@Component({
  selector : 'page-login',
  templateUrl: 'login.html',
   
})
export class LoginComponent {

  loginForm: FormGroup;
  loading: Loading;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private events:Events,
    private commonServices: CommonServices,
    private loginService: LoginService) 
    {        
      this.loginForm = this._fb.group({
        userName: ['', [<any>Validators.required]],
        password: ['', [<any>Validators.required]]
      });
    }


  ionViewDidLoad() {
    
    let userId = localStorage.getItem('$LoopBackSDK$userId');
    console.log("LoginComponent ionViewDidLoad.......",userId);

    if(userId){
      this.events.publish('isLoggedIn');
      this.navCtrl.setRoot(HomeComponent);
    }

  /*
    this.configureSlides();
    let accessToken = localStorage.getItem('$LoopBackSDK$id');
    let user: Account = JSON.parse(localStorage.getItem('$LoopBackSDK$user'));
    let userId = localStorage.getItem('$LoopBackSDK$userId');
    if (accessToken && user) {
      this.getAccountDetails(userId);
    }
    */
  }
  
  login({ value, valid }: { value: ILogin, valid: boolean }){
 
     if (valid) {
      this.loading = this.loadingCtrl.create({
        content: 'Logging In...'
      }); this.loading.present();
      
      this.loginService.login({ userName: value.userName, password: value.password }).subscribe(
          data => {
            this.events.publish('isLoggedIn');
              this.navCtrl.setRoot(HomeComponent);
              this.loading.dismissAll();
          },
          error => {
            this.loading.dismissAll();

            //this.commonServices.showAlert('Login Error', error.message);
          });
    } else {
      this.commonServices.showAlert('Invalid Details', 'Enter a valid login ID and password to continue')
    }
   
  }
}

interface ILogin {
  userName: string;
  password: string;
}