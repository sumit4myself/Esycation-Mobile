import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileService } from '../../../providers/service/profile/profile.service';
import { ViewProfileComponent } from '../viewProfile/viewProfile';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(ViewProfileComponent),

        PushCounterModule
    ],
    exports: [ViewProfileComponent],
    declarations: [ViewProfileComponent],
    providers: [ProfileService],
})
export class ProfileModule { }
