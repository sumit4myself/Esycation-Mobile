import { NgModule } from '@angular/core';
import { LoginPage1 } from './login1';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    LoginPage1,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage1),
  ],
  exports: [
    LoginPage1
  ]
})
export class LoginPageModule1 {}
