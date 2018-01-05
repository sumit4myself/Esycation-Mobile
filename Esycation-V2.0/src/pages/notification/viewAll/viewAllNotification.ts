import { Component } from '@angular/core';
import { IonicPage, LoadingController, Loading, Nav } from 'ionic-angular';
import { UserSessionService } from '../../../providers/service/core/user.session.service';
import { NotificationService } from '../../../providers/service/notification/notification.service';
import { NotificationDetails } from '../../../providers/model/notification/notification.model';
//import {PagedResponse} from '../../../providers/model/common/PaggedResponse';

@IonicPage()
@Component({
    selector: 'view-all-notification-page',
    templateUrl: 'viewAllNotification.html'
})
export class ViewAllNotificationComponent {

    public notifications = new Array<NotificationDetails>();
    loading: Loading;
    remoteId: number;
    module: string;
    shownDetail = null;
    notificationCount: any = 0;
    constructor(
        private loadingCtrl: LoadingController,
        private session: UserSessionService,
        private notificationService: NotificationService,
        private nav: Nav) {

        this.remoteId = this.session.findRemote();
        this.module = this.session.findModule();
        this.findAllNotifications(this.remoteId, this.module);

    }

    findAllNotifications(remoteId: number, module: string) {

        this.loading = this.loadingCtrl.create({
            content: 'Loading..'
        }); this.loading.present();
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

            this.loading.dismissAll();
            console.log("notifications===", this.notifications);


        }, error => {
            this.loading.dismissAll();
            console.log(error);
        });
    }

    onRead(id: number) {
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
        },error=>{
            console.error(error);
            this.loading.dismissAll();
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
