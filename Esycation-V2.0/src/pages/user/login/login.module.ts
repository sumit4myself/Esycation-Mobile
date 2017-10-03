import { NgModule } from '@angular/core';
import { IonicModule,IonicPageModule } from 'ionic-angular';
import {LoginComponent} from '../login/login';

import {AuthService} from '../../../providers/service/core/auth.service';
import {CostumErrorHandler} from '../../../providers/service/core/error.service';
import {BreanchService} from '../../../providers/service/branch/breanch.service';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
@NgModule({
    imports: [
        IonicPageModule.forChild(LoginComponent),
    ],
    exports: [LoginComponent ],
    declarations: [LoginComponent],
    providers: [AuthService,CostumErrorHandler,BreanchService,UserSessionService],
})
export class LoginModule { }
