import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {LoginComponent} from '../user/login/login.component';
import {LogoutComponent} from '../user/logout/logout.component';
import {AccountListComponent} from '../user/addaccount/accountlist.component';
import {AddAcountComponent} from '../user/addaccount/add.account.component'
import {BranchComponent} from '../user/branch/branch.compoent';

@NgModule({
    imports: [
        IonicModule
    ],
    entryComponents: [
        LoginComponent,
        LogoutComponent,
        AccountListComponent,BranchComponent,
        AddAcountComponent],
    declarations: [
        LoginComponent,
        LogoutComponent,
        AccountListComponent,BranchComponent,
        AddAcountComponent],
    providers: [],
})
export class UserModule { }
