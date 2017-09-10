import { Component } from '@angular/core';
import { ViewController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotComponent } from '../forgot/forgot.component';
import { LoopBackAuth, Account, AccountApi, ContactApi } from '../../../shared/sdk/';
import { CommonServices } from '../../../shared/services/common.service';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from 'ng2-ui-auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  loading: Loading;

  constructor(
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private auth: LoopBackAuth,
    private loadingCtrl: LoadingController,
    private contactApi: ContactApi,
    private userApi: AccountApi,
    private commonServices: CommonServices,
    private authService: AuthService
  ) {

    this.loginForm = this._fb.group({
      email: ['adam@ionic.com', [<any>Validators.required, CustomValidators.email]],
      password: ['password', [<any>Validators.required, <any>Validators.minLength(5)]]
    });
  }

  socialLogin(provider: string) {
    this.loading = this.loadingCtrl.create({
      content: 'Logging In...'
    }); this.loading.present();
    this.authService.authenticate(provider)
      .subscribe((data: any) => {
        data = JSON.parse(data._body);
        this.commonServices.rememberMe(data);
        this.getAccountDetails(data);
      },
      error => {
        this.loading.dismissAll();
        this.commonServices.showAlert('Login Error', error.message);
      });
  }

  login({ value, valid }: { value: ILogin, valid: boolean }) {
    if (valid) {
      this.loading = this.loadingCtrl.create({
        content: 'Logging In...'
      }); this.loading.present();
      this.userApi.login({ email: value.email, password: value.password }).subscribe(
        data => {
          this.commonServices.rememberMe(data);
          this.getAccountDetails(data);
        },
        error => {
          this.loading.dismissAll();
          this.commonServices.showAlert('Login Error', error.message);
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

  openForgot() {
    let modal = this.modalCtrl.create(ForgotComponent);
    modal.onDidDismiss((data: any) => {
      if (data) {
        this.commonServices.presentToast('Password Reset successful. Login to continue');
        this.loginForm.setValue({ email: data.email, password: data.password });
      }
    });
    modal.present();
  }

}

interface ILogin {
  email: string;
  password: string;
}
