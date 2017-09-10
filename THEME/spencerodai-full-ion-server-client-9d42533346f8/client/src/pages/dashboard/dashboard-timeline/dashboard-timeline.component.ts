import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Feed, FireLoopRef, RealTime } from '../../../shared/sdk';

@Component({
  selector: 'dashboard-timeline',
  templateUrl: 'dashboard-timeline.html'
})
export class DashboardTimelineComponent {

  user:Contact
  feedItem: Feed;
  mock: any;
  feed: Observable<Feed | Array<Feed>>;
  reference: FireLoopRef<Feed>;

  constructor(
    private loadingCtrl: LoadingController,
    private commonServices: CommonServices,
    private rt: RealTime
    ) {

    this.user = commonServices.currentUser;
    this.reference = this.rt.FireLoop.ref<Feed>(Feed);
    this.feed = this.reference.on('change', { where: { and: [{ is_active: true }, { is_deleted: false }] }, include: ['contact', 'likes', 'comments'] });
    
  }

}

