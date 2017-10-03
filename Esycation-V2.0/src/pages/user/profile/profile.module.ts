import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//import { MomentModule } from 'angular2-moment';

import { ProfileComponent } from '../profile/profile';

@NgModule({
    imports: [
        IonicPageModule.forChild(ProfileComponent),
    ],
    exports: [ProfileComponent ],
    declarations: [ProfileComponent],
    providers: [],
})
export class ProfileModule { }
