import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfileComponent } from '../editProfile/editprofile';
import { ProfileService } from '../../../providers/service/profile/profile.service';
import { FileService } from '../../../providers/service/file/file.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
@NgModule({
    imports: [
        IonicPageModule.forChild(EditProfileComponent),

        PushCounterModule
    ],
    exports: [EditProfileComponent],
    declarations: [EditProfileComponent],
    providers: [ProfileService, Camera, FileService,FileTransfer,FileTransferObject],
})
export class EditProfileModule { }
