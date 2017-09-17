import { Component } from '@angular/core';
import { ViewController,NavController, ModalController, LoadingController, Loading,Events } from 'ionic-angular';
import {HomeComponent} from '../../default/home/home.componet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {CommonServices} from '../../../shared/services/common/common.service';
import {AddAcccountService} from '../../../shared/services/add-account/add.account.service';
import {LoginService} from '../../../shared/services/userauth/login.auth';
import {Branch} from '../../../shared/models/branch/model.branch';
import {NotificationService} from '../../../shared/services/notification/notification.service';

@Component({
  selector: 'add-acount',
  templateUrl: 'addaccount.html'
})
export class AddAcountComponent {

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
      private addAcccountService: AddAcccountService,
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


      onAddAccounnt({value,valid}:{value:ILogin,valid:boolean}){

         if (valid) {
            this.loading = this.loadingCtrl.create({
              content: 'Add Acount...'
            }); this.loading.present();
            
            this.addAcccountService.addAccount({ 
              userName: value.userName, 
              password: value.password,
              branchId:value.branchId
            }).subscribe(
                data => {
                   this.viewCtrl.dismiss(true);
                    this.loading.dismissAll();
                    this.notificationService.registerNotificationUser().subscribe(d=>{
                      
                    });
                },
                error => {
                  this.loading.dismissAll();
                });
          } else {
            this.commonServices.showAlert('Invalid Details', 'Enter a valid login ID and password to continue')
          }
      }

    onBack(){
        this.viewCtrl.dismiss();
    }

  }
interface ILogin {
  userName: string;
  password: string;
  branchId:number;
}
