import { Component } from '@angular/core';
import { IonicPage,NavController,Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Branch} from '../../../providers/model/common/model.branch';
import {AuthService} from '../../../providers/service/core/auth.service';
import {CommonServices} from '../../../providers/service/common/common.service';
import {PagedResponse} from '../../../providers/model/common/PaggedResponse';
import {BreanchService} from '../../../providers/service/branch/breanch.service';
import {UserSessionService} from '../../../providers/service/core/user.session.service';

@IonicPage()
@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
   
})
export class LoginComponent {
  
  loginForm: FormGroup;
  pagedResponse=PagedResponse.getInstance();
  branchs:Array<Branch>=new Array<Branch>();
  branch:Branch=new Branch();
  userId:number;
  public backgroundImage: any = "./assets/bg1.jpg";
  public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private events:Events,
    private authService:AuthService,
    private commonServices:CommonServices,
    private breanchService:BreanchService,
    private session:UserSessionService) 
    {        
      this.loginForm = this.formBuilder.group({
        userName: ['', [<any>Validators.required]],
        password: ['', [<any>Validators.required]],
        branchId:   ['',[]]
      });
      console.log(this.session.findUserId());
      
      this.userId = this.session.findUserId();
      if(this.userId){
        this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));
      }

    }


  ionViewDidLoad() {
    
    this.commonServices.onLoader();
    this.breanchService.findBranch().subscribe(data=>{
      this.commonServices.onDismissAll();
      for(let branchDetails of data.contents){
        this.branch = new Branch();
        let b = Object.assign(this.branch,branchDetails);
        this.branchs.push(b);
      }
   },error=>{
    console.log("Error: ",error);
    this.commonServices.onDismissAll();
  });
    
  }
  
  login({ value, valid }: { value: Login, valid: boolean }){
     
    
    if (valid) {
      this.commonServices.onLoader("Logging In...");
      this.authService.login(
        { 
          userName: value.userName, 
          password: value.password,
          branchId:value.branchId
          
        }).subscribe( data => {
            
            data={
              remoteId:this.session.findRemote(),
              module:this.session.findModule()
            };
            data.registrationId =localStorage.getItem("registrationId");
            this.events.publish('LOGIN_USER_EVENT');
            this.events.publish('user:loggedin',data);   
            this.navCtrl.setRoot(UserSessionService.findDashBoardByModule(this.session.findModule()));  
            this.commonServices.onDismissAll();
          },error=>{
            this.commonServices.onDismissAll();
            console.log(error);
          });
    } else {
      this.commonServices.showAlert('Invalid Details', 'Enter a valid login ID and password to continue')
    } 
   
  }
}


interface Login {
  userName: string;
  password: string;
  branchId:number;
}


