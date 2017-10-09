import { Component,ViewChild } from '@angular/core';
import { IonicPage,ViewController,NavController,ModalController, LoadingController, Loading,Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Branch} from '../../../providers/model/common/model.branch';
import {AuthService} from '../../../providers/service/core/auth.service';
import {CommonServices} from '../../../providers/service/common/common.service';
import {PagedResponse} from '../../../providers/model/common/PaggedResponse';
import {BreanchService} from '../../../providers/service/branch/breanch.service';

@IonicPage()
@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
   
})
export class LoginComponent {
  
  loginForm: FormGroup;
  loading: Loading;
  pagedResponse=PagedResponse.getInstance();
  branchs:Array<Branch>=new Array<Branch>();
  branch:Branch=new Branch();
  public backgroundImage: any = "./assets/bg1.jpg";
  public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private events:Events,
    private authService:AuthService,
    private commonServices:CommonServices,
    private breanchService:BreanchService) 
    {        
      this.loginForm = this.formBuilder.group({
        userName: ['', [<any>Validators.required]],
        password: ['', [<any>Validators.required]],
        branchId:   ['',[]]
      });

      console.log("s==",JSON.stringify(this.pagedResponse));
    }


  ionViewDidLoad() {
    
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: 'Loading..'
    });
    loadingPopup.present();
    this.breanchService.findBranch().subscribe(data=>{
      for(let branchDetails of data.contents){
        this.branch = new Branch();
        let b = Object.assign(this.branch,branchDetails);
        this.branchs.push(b);
      }
      loadingPopup.dismiss();
   }
   , error => {
    loadingPopup.dismiss()
  });
    
  }
  
  login({ value, valid }: { value: Login, valid: boolean }){
    
    console.log("Login..",valid);
    this.navCtrl.setRoot("HomeComponent");    
    if (valid) {
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: 'Logging In...'
      }); this.loading.present();
      
      this.authService.login(
        { 
          userName: value.userName, 
          password: value.password,
          branchId:value.branchId
          
        }).subscribe(
          data => {
            //this.events.publish('isLoggedIn');
            this.navCtrl.setRoot("HomeComponent");            
            this.loading.dismissAll();
          },
          error => {
            console.log("Login Erro...");
            this.loading.dismissAll();
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


