import { Component } from '@angular/core';
import { ViewController,NavController, ModalController, LoadingController, Loading,Events } from 'ionic-angular';
import {HomeComponent} from '../../default/home/home.componet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {CommonServices} from '../../../shared/services/common/common.service';
import {AddAcccountService} from '../../../shared/services/add-account/add.account.service';

@Component({
  selector: 'add-acount',
  templateUrl: 'addaccount.html'
})
export class AddAcountComponent {

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
      private addAcccountService: AddAcccountService) 
      {        
        this.loginForm = this._fb.group({
          userName: ['', [<any>Validators.required]],
          password: ['', [<any>Validators.required]]
        });
      }
      onAddAccounnt({value,valid}:{value:ILogin,valid:boolean}){

         if (valid) {
            this.loading = this.loadingCtrl.create({
              content: 'Add Acount...'
            }); this.loading.present();
            
            this.addAcccountService.addAccount({ userName: value.userName, password: value.password }).subscribe(
                data => {
                   this.viewCtrl.dismiss(true);
                    this.loading.dismissAll();
                },
                error => {
                  this.loading.dismissAll();
                  this.commonServices.showAlert('ERROR', 'Enter a valid login ID and password to continue')
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
}
