import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Feed, FeedApi } from '../../../shared/sdk';

@Component({
  selector: 'profile-stories',
  templateUrl: 'profile-stories.html'
})
export class ProfileStoriesComponent implements OnInit {

  user: Contact
  feed: Feed[];
  rows: number[];
  
  constructor(
    private commonServices: CommonServices,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private feedApi: FeedApi
  ) {
    this.user = commonServices.currentUser;
  }

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.feedApi.find({
      where: { and: [{ is_active: true }, { is_deleted: false }, { contactId: this.user.id }] },
      include: ['contact', 'likes', 'comments']
    }).subscribe(
      (feed: Feed[]) => {
        this.feed = feed;
        this.rows = Array.from(Array(Math.ceil(this.feed.length / 2)).keys());
      },
      error => {
        this.commonServices.showAlert('Error', error.message);
      })
  }
}
