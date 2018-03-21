import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileViewComponent } from '../viewFile/file.view';
@NgModule({
    imports: [IonicPageModule.forChild(FileViewComponent)],
    exports: [FileViewComponent],
    declarations: [FileViewComponent],
    providers: [],

})
export class FileViewModule {

}