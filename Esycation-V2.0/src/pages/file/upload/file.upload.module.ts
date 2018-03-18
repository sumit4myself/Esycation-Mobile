import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileUploadComponent } from '../upload/file.upload';
import { Camera } from '@ionic-native/camera';
import { FileService } from '../../../providers/service/file/file.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
@NgModule({
    imports: [IonicPageModule.forChild(FileUploadComponent)],
    exports: [FileUploadComponent],
    declarations: [FileUploadComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [FileService, Camera,FileTransfer,FileTransferObject],

})
export class FileUploadModule {

}