import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileDownlaodComponent } from '../download/file.download';
import { FileOpener } from '@ionic-native/file-opener';
@NgModule({
    imports: [IonicPageModule.forChild(FileDownlaodComponent)],
    exports: [FileDownlaodComponent],
    declarations: [FileDownlaodComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [FileOpener],

})
export class FileDownlaodModule {

}