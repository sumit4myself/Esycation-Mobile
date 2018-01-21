import { Component } from '@angular/core';
import { IonicPage,ViewController,Events,NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  branchId:number;
  public backgroundImage: any = "./assets/bg1.jpg";
  public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private navCtrl:NavController,
    private events:Events,
    private authService:AuthService,
    private commonServices:CommonServices,
    private session:UserSessionService,) 
    {        
      this.loginForm = this.formBuilder.group({
        userName: ['', [<any>Validators.required]],
        password: ['', [<any>Validators.required]]
      });
      this.branchId = this.session.findBranchId();
    }


  login({ value, valid }: { value: Login, valid: boolean }){
      
    if (valid) {
      this.commonServices.onLoader();
      this.authService.login(
        { 
          userName: value.userName, 
          password: value.password,
          branchId:this.branchId
          
        }).subscribe(
          data => {
            data={
              remoteId:this.session.findRemote(),
              module:this.session.findModule()
            };
            data.registrationId =localStorage.getItem("registrationId");
            this.commonServices.onDismissAll();
            this.events.publish('LOGIN_USER_EVENT');   
            this.events.publish('user:loggedin',data);
            this.navCtrl.popToRoot();
            this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule())); 
            window.location.reload();
            
          },error=>{
            this.commonServices.onDismissAll();
            console.log(error)
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
