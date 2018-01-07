import { Component } from '@angular/core';
import { IonicPage, Nav } from 'ionic-angular';
import { UserSessionService } from '../../../providers/service/core/user.session.service';
import { NotificationService } from '../../../providers/service/notification/notification.service';
import { NotificationDetails } from '../../../providers/model/notification/notification.model';
import {CommonServices} from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
    selector: 'view-all-notification-page',
    templateUrl: 'viewAllNotification.html'
})
export class ViewAllNotificationComponent {

    public notifications = new Array<NotificationDetails>();
    remoteId: number;
    module: string;
    shownDetail = null;
    notificationCount: any = 0;
    constructor(
        private session: UserSessionService,
        private notificationService: NotificationService,
        private nav: Nav,
        private commonServices:CommonServices) {

        this.remoteId = this.session.findRemote();
        this.module = this.session.findModule();
        this.findAllNotifications(this.remoteId, this.module);

    }

    findAllNotifications(remoteId: number, module: string) {

        this.commonServices.onLoader();
        this.notificationService.findAllByRemoteIdAndModule(remoteId, module).subscribe(data => {

            for (let notification of data.contents) {
                let b = Object.assign({}, notification);
                b.styleColor = this.findColor(b.notificationId.type);
                b.typeInfo = this.findInfo(b.notificationId.type);
                this.notifications.push(b);
                if (b.readStatus == 'UNREAD') {
                    this.notificationCount++;
                }
            }
            localStorage.setItem("notificationCount", this.notificationCount);
            this.commonServices.onDismissAll();

        }, error => {
            this.commonServices.onDismissAll();
            console.log(error);
        });
    }

    onRead(id: number) {
        this.commonServices.onLoader();
        this.onView(id);
        this.notificationService.readMessage(id).subscribe(data => {
            console.error(data);
            for (let notification of this.notifications) {
                if (id == notification.id && notification.readStatus == 'UNREAD') {
                    notification.readStatus = "READ";
                    this.notificationCount = this.notificationCount - 1;
                    localStorage.setItem("notificationCount", this.notificationCount);
                }
            }
            this.commonServices.onDismissAll();
        },error=>{
            console.error(error);
            this.commonServices.onDismissAll();
       });
    }

    toggleDetail(group) {
        if (this.isDetailShown(group)) {
            this.shownDetail = null;
        } else {
            this.shownDetail = group;
        }
    };
    isDetailShown(group) {
        return this.shownDetail === group;
    };

    onView(id: number) {
        this.nav.push("ViewNotificationComponent", { id: id });
    }


    findColor(type: any): string {

        if (type == 'INFORMATIVE')
            return "#488aff";
        else if (type == 'URGENT')
            return "#f53d3d";
        else if (type == 'ACTIONABLE')
            return "#ffeb3b";
        else if (type == 'HOMEWORK')
            return "#ff5722";
        else
            return "#9e9e9e";
    }

    findInfo(type: string): string {

        if (type == 'INFORMATIVE')
            return "i";
        else if (type == 'URGENT')
            return "U";
        else if (type == 'ACTIONABLE')
            return "A";
        else if (type == 'HOMEWORK')
            return "H";
        else
            return "?";
    }
}
