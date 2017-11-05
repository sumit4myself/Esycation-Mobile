import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {EditProfileComponent} from '../editProfile/editprofile';
import {ProfileService} from '../../../providers/service/profile/profile.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(EditProfileComponent),
    ],
    exports: [EditProfileComponent ],
    declarations: [EditProfileComponent],
    providers: [ProfileService],
})
export class EditProfileModule { }
