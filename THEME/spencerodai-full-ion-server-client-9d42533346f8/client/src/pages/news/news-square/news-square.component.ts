import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, PopoverController, ModalController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Feed, FireLoopRef, RealTime, Friend, FriendApi } from '../../../shared/sdk';
import { NewsAddModal } from '../news-add/news-add.component';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { PeopleComponent } from '../../people/people.component';

@Component({
  selector: 'news-square',
  templateUrl: 'news-square.html'
})
export class NewsSquareComponent implements OnInit {

  user: Contact
  feed: Array<Feed>;
  feedBackUp: Array<Feed>;
  reference: FireLoopRef<Feed>;
  prefs: any;
  pushPage: any;
  loading: Loading;
  friend_ids: any[] = [];

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private commonServices: CommonServices,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private friendApi: FriendApi,
    private rt: RealTime
  ) { }

   ngOnInit() {
    this.pushPage = NewsDetailComponent;
    this.user = this.commonServices.currentUser;
    this.reference = this.rt.FireLoop.ref<Feed>(Feed);
  }

  /*
    on page enter, get Id's of current users firends and save into this.friend_ids variable. 
    this will be used to later to query feed for feed whose contact id matches an id in the friend_ids array.
  */
  ionViewDidEnter() {
    if (!this.feed) {
      this.loading = this.loadingCtrl.create({
        content: 'Retriving Feed...'
      }); this.loading.present();
    }
    this.friendApi.find({
      where: { and: [{ is_active: true }, { is_deleted: false }, { contactId: this.user.id }] }
    }).subscribe(
      (friends: Friend[]) => {
        friends.forEach(friend => {
          this.friend_ids.push(friend.friendId);
        });
        this.friend_ids.push(this.user.id);
        this.getFeed();
      })
  }

  /* 
    Get feed using realtime. 
    { contactId: { inq: this.friend_ids }} in the loopback filter JSON searches
    the array of friends IDs to find feed objects who's id matches an ID in the array 
  */
  getFeed() {
    this.reference.on('change', {
      where: {
        and: [
        { is_active: true },
        { is_deleted: false },
        { contactId: { inq: this.friend_ids } }]
      },
      include: [{
        relation: 'contact',
        scope: {
          where: { and: [{ is_active: true }, { is_deleted: false }] },
        },
      }, {
        relation: 'likes',
        scope: {
          where: { and: [{ is_active: true }, { is_deleted: false }] },
          include: {
            relation: 'contact',
            scope: {
              where: { and: [{ is_active: true }, { is_deleted: false }] }
            }
          }
        }
      },  {
        relation: 'comments',
        scope: {
          where: { and: [{ is_active: true }, { is_deleted: false }] },
        },
      }],
      order: this.user.preference.sortFeedBy + ' ' + this.user.preference.sortFeedOrder
    }).subscribe((feed: Array<Feed>) => {
      this.loading ? this.loading.dismissAll() : null;
      this.feed = this.feedBackUp = feed;
    });
  }

  /*
    open modal to add a new feed. on dismiss, 
    get feed object from modal and insert or update the entry in feed document/table
  */
  addFeed() {
    let modal = this.modalCtrl.create(NewsAddModal, { feed: undefined });
    modal.onDidDismiss((_feed: Feed) => {
      if (_feed) {
        this.reference.create(_feed).subscribe(() =>
          this.commonServices.presentToast('Feed Saved'));
      }
    });
    modal.present();
  }

  /*search by placing the search value into a query string for the fields you want to search within.
       "or: [{ title: { like: val, options: 'i' } }, { content: { like: val, options: 'i' } }" 
       options i allows you to do a wildcard search regardless of the case (capital or lower case)
  */
  onSearch(ev: any) {
     let val = ev.target.value;
    this.feed = [...this.feedBackUp];
    if (val && val.trim() !== '') {
      this.feed = this.feed.filter((item) => {
        return (item.content.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.contact.title.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.contact.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.contact.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /*
   used in a button that can be access when the page has no feed 
   because the user has no feed or has no friends to view thier feed.
   this will navigate to people page when user can add friends and view profile.
  */
  peoplePage() {
    this.navCtrl.push(PeopleComponent);
  }

}
