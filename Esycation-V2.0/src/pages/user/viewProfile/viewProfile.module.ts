import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ProfileService} from '../../../providers/service/profile/profile.service';

import { ViewProfileComponent } from '../viewProfile/viewProfile';

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewProfileComponent),
    ],
    exports: [ViewProfileComponent ],
    declarations: [ViewProfileComponent],
    providers: [ProfileService],
})
export class ProfileModule { }
