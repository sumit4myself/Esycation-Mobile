import { Component } from '@angular/core';
import { IonicPage,ViewController, LoadingController, Loading,Events,NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import {Branch} from '../../../providers/model/common/model.branch';
import {AuthService} from '../../../providers/service/core/auth.service';
import {CommonServices} from '../../../providers/service/common/common.service';
import {UserSessionService} from '../../../providers/service/core/user.session.service';

@IonicPage()
@Component({
  selector: 'addAccount-page',
  templateUrl: 'addAccount.html',
   
})
export class AddAccountComponent {

  loginForm: FormGroup;
  loading: Loading;
  branchId:number;
  public backgroundImage: any = "./assets/bg1.jpg";
  public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private navCtrl:NavController,
    private loadingCtrl: LoadingController,
    private events:Events,
    private authService:AuthService,
    private commonServices:CommonServices,
    private session:UserSessionService) 
    {        
      this.loginForm = this.formBuilder.group({
        userName: ['', [<any>Validators.required]],
        password: ['', [<any>Validators.required]]
      });
      this.branchId = this.session.findBranchId();
    }


  login({ value, valid }: { value: Login, valid: boolean }){
      
    if (valid) {
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: 'Logging In...'
      }); this.loading.present();
      
      this.authService.login(
        { 
          userName: value.userName, 
          password: value.password,
          branchId:this.branchId
          
        }).subscribe(
          data => {
            console.log(data);      
            this.loading.dismissAll();
            this.events.publish('LOGIN_USER_EVENT');   
            this.navCtrl.setRoot("HomeComponent"); 
           
           
          },error=>{
            this.loading.dismissAll();
            console.log(error)
           // this.commonServices.presentToast(error,"short");
          }
        );
    } else {
      this.commonServices.showAlert('Invalid Details', 'Enter a valid login ID and password to continue')
    } 
   
  }

  onBack(){
    this.viewCtrl.dismiss();
  }
}


interface Login {
  userName: string;
  password: string;
  branchId:number;
}
