import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { IntroComponent } from './intro.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { DashboardModule } from '../dashboard/dashboard.module'
import { CustomPipesModule } from '../../shared/pipes/custom-pipes.module';

@NgModule({
    imports: [
        IonicModule,
        MomentModule,
        CustomPipesModule,
        DashboardModule
    ],
    entryComponents: [
        IntroComponent,
        LoginComponent,
        SignupComponent,
        ForgotComponent],

    declarations: [
        IntroComponent,
        LoginComponent,
        SignupComponent,
        ForgotComponent],
    providers: [],
})
export class IntroModule { }
