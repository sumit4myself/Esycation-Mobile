import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewBulkMessageComponent } from '../viewBulkMessage/viewBulkMessage';
import { BulkNotificationService } from '../../../../providers/service/notification/bulk.notification.service';

import { LoaderModule } from "../../../../components/loader/loader.module";

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewBulkMessageComponent),

        LoaderModule
    ],
    exports: [ViewBulkMessageComponent],
    declarations: [ViewBulkMessageComponent],
    providers: [BulkNotificationService],
})
export class ViewBulkMessageComponentModule { }
