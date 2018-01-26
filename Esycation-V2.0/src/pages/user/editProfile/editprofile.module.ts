import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfileComponent } from '../editProfile/editprofile';
import { ProfileService } from '../../../providers/service/profile/profile.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(EditProfileComponent),

        PushCounterModule
    ],
    exports: [EditProfileComponent],
    declarations: [EditProfileComponent],
    providers: [ProfileService],
})
export class EditProfileModule { }
