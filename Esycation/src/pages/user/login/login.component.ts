import { Component } from '@angular/core';
import { ViewController,NavController, ModalController, LoadingController, Loading,Events } from 'ionic-angular';
import {HomeComponent} from '../../default/home/home.componet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {CommonServices} from '../../../shared/services/common/common.service';
import {LoginService} from '../../../shared/services/userauth/login.auth';
import {Branch} from '../../../shared/models/branch/model.branch';
import {NotificationService} from '../../../shared/services/notification/notification.service';
@Component({
  selector : 'page-login',
  templateUrl: 'login.html',
   
})
export class LoginComponent {

  loginForm: FormGroup;
  loading: Loading;
  branchs:Array<Branch>=new Array<Branch>();
  branch:Branch=new Branch();
  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private events:Events,
    private commonServices: CommonServices,
    private loginService: LoginService,
    private notificationService:NotificationService) 
    {        
      this.loginForm = this._fb.group({
        userName: ['', [<any>Validators.required]],
        password: ['', [<any>Validators.required]],
        branchId:   ['',[]]
      });
    }


  ionViewDidLoad() {
    
    let userId = localStorage.getItem('$LoopBackSDK$userId');
    if(userId){
      this.events.publish('isLoggedIn');
      this.navCtrl.setRoot(HomeComponent);
    }
    this.loading = this.loadingCtrl.create({
      content: 'Loading..'
    });
    this.loading.present();
    this.loginService.findAllBranch().subscribe(
      data=>{
        for(let branchDetails of data.contents){
          this.branch = new Branch();
          let b = Object.assign(this.branch,branchDetails);
          this.branchs.push(b);
        }
        this.loading.dismissAll();
      },
      error=>{
        this.loading.dismissAll();
      }
    );
  }
  
  login({ value, valid }: { value: ILogin, valid: boolean }){
 
     if (valid) {
      this.loading = this.loadingCtrl.create({
        content: 'Logging In...'
      }); this.loading.present();
      
      this.loginService.login(
        { 
          userName: value.userName, 
          password: value.password,
          branchId:value.branchId
          
        }).subscribe(
          data => {
            this.events.publish('isLoggedIn');
            this.notificationService.registerNotificationUser().subscribe(d=>{
              console.log("d===",d)
            });
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
  branchId:number;
}


