import { Component } from '@angular/core';
import { ViewController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Account, ContactApi, AccountApi } from '../../../shared/sdk/';
import { CommonServices } from '../../../shared/services/common.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {

  signupForm: FormGroup;
  loading: Loading;

  constructor(
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private contactApi: ContactApi,
    private userApi: AccountApi,
    private commonServices: CommonServices
  ) {

    let password = new FormControl('', [Validators.required]);
    let rpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
    this.signupForm = this._fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      password: password,
      rpassword: rpassword
    });
  }


  signUp({ value, valid }: { value: IRegister, valid: boolean }) {
    if (valid) {
      this.loading = this.loadingCtrl.create({
        content: 'Logging In...'
      }); this.loading.present();
      delete value.rpassword;
      this.userApi.create(value).subscribe(
        data => {
          this.userApi.login(value).subscribe(
            data => {
              this.commonServices.rememberMe(data);
              this.getAccountDetails(data);
            }, error => {
              this.loading.dismissAll();
              this.commonServices.showAlert('Sign Up Error', error.message);
            })
        },
        error => {
          this.loading.dismissAll();
          this.commonServices.showAlert('Sign Up Error', error.message);
        });
    } else {
      this.commonServices.showAlert('Invalid Details', 'Enter a valid email and password to continue')
    }
  }

  getAccountDetails(data) {
    this.userApi.findById(data.userId,
      {
        include: {
          relation: 'contact',
          scope: {
            where: { and: [{ is_active: true }, { is_deleted: false }] },
            include: {
              relation: 'preference',
              scope: {
                where: { and: [{ is_active: true }, { is_deleted: false }] },
              }
            }
          }
        }
      }).subscribe(
      (user: Account) => {
        this.loading.dismissAll();
        this.viewCtrl.dismiss(user);
      },
      error => {
        this.loading.dismissAll();
        this.commonServices.showAlert('Login Error', error.message);
      });
  }
}

interface IRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  rpassword: string;
}
