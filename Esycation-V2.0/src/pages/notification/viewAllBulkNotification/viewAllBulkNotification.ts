import { Component } from '@angular/core';
import { IonicPage, Nav } from 'ionic-angular';
import { UserSessionService } from '../../../providers/service/core/user.session.service';
import { BulkNotificationService } from '../../../providers/service/notification/bulk.notification.service';
import { CommonServices } from '../../../providers/service/common/common.service';
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'view-all-bulk-notification',
    templateUrl: 'viewAllBulkNotification.html'
})
export class ViewAllBulkNotificationComponent {

    notifications: Array<any> = new Array<any>();
    page: number = 1
    size: number = 10
    totalPages: number = 0;
    constructor(
        private session: UserSessionService,
        private nav: Nav,
        private bulkNotificationService: BulkNotificationService,
        private commonServices: CommonServices) {

        console.log("ViewAllBulkNotificationComponent==", this.session);
    }

    ionViewDidLoad() {
        this.prepareData();
    }

    onLoad(infiniteScroll) {

        console.log("page=", this.page, "totalPages=", this.totalPages, "event==", event);
        if (this.page <= this.totalPages) {

            this.prepareData();
            infiniteScroll.complete();
        } else {
            infiniteScroll.complete();
        }
    }


    onAddNew() {
        this.nav.push("BulkNotificationComponent");
    }

    onEdit(id: number) {
        this.nav.push("EditBulkNotificationComponent", { id: id });
    }

    onViewRecievers(id: number) {
        this.nav.push("ViewBulkNotificationsComponent", { id: id });
    }
    onViewMessage(id:number){
        this.nav.push("ViewBulkMessageComponent", { id: id });
    }

    onDelete(id: number) {
        this.commonServices.onLoader();
        this.bulkNotificationService.deleteBulkNotification(id).subscribe(data => {
            console.log(data);
            this.commonServices.onDismissAll();
            this.commonServices.presentToast("Data deleted successfully", null, "success");
        }, error => {
            this.commonServices.onDismissAll();
            console.error("ERROR :", error);
        })
    }

    findColor(title: string): string {

        let type = title.substring(0, 1);
        if (type == 'S')
            return "#EA1E63";
        else if (type == 'O')
            return "#0059B2";
        else if (type == 'E')
            return "#8dc34b";
        else if (type == 'P')
            return "#ff9800";
        else
            return "#9e9e9e";
    }

    findFirstLatter(title: string): string {

        return title.substring(0, 1);
    }

    prepareData(){

        this.bulkNotificationService.manage(this.page, this.size).subscribe(data => {
            if (data.contents.length > 0) {
                for (let notification of data.contents) {

                    notification.colorId = this.findColor(notification.template.mode);
                    notification.str = this.findFirstLatter(notification.template.mode);
                    notification.restricted = moment(notification.pushTime, "DD/MM/YYYY HH:mm:ss").isBefore(moment(moment(), "DD/MM/YYYY HH:mm:ss"));
                    this.notifications.push(notification);
                }
                this.totalPages = data.metadata.totalPages;
                this.page++;
            }
        }, error => {
            console.error(error);
        });

    }
}
