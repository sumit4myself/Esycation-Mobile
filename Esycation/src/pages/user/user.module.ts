import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {LoginComponent} from '../user/login/login.component';
import {LogoutComponent} from '../user/logout/logout.component';
import {AccountListComponent} from '../user/addaccount/accountlist.component';
import {AddAcountComponent} from '../user/addaccount/add.account.component'

@NgModule({
    imports: [
        IonicModule
    ],
    entryComponents: [
        LoginComponent,
        LogoutComponent,
        AccountListComponent,
        AddAcountComponent],
    declarations: [
        LoginComponent,
        LogoutComponent,
        AccountListComponent,
        AddAcountComponent],
    providers: [],
})
export class UserModule { }
