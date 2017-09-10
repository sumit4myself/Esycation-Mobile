import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, PopoverController, ViewController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { PlacesServices } from '../../../shared/services/places.service';
import { Contact, Feed, FeedApi, Like, LikeApi } from '../../../shared/sdk';
import { NewsAddModal } from '../news-add/news-add.component';
import { NewsLikesComponent } from '../news-likes/news-likes.component';
import { NewsCommentsComponent } from '../news-comments/news-comments.component';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'news-detail',
  templateUrl: 'news-detail.html'
})
export class NewsDetailComponent implements OnInit {

  user: Contact
  post: Feed;
  prefs: any = { view: 'classic' };
  alreadyLiked: Like;
  location: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private commonServices: CommonServices,
    private placesServices: PlacesServices,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private likeApi: LikeApi,
    private feedApi: FeedApi,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    this.user = this.commonServices.currentUser;
    this.post = this.navParams.data;
    this.getLocation();
    /*
      search post for likes by user. if the user has already liked this post, 
      return the like object to be user later.
    */
    this.alreadyLiked = this.post.likes.find(like => like.contactId === this.user.id);
  }

  /*
    reload post
  */
  reloadPost() {
    this.feedApi.findById(this.post.id, {
      where: { and: [{ is_active: true }, { is_deleted: false }] },
      include: ['contact', { likes: 'contact' }, 'comments']
    }).subscribe((result: Feed) => {
      this.post = Object.assign(this.post, result);
    })
  }

  /*
    open edit post modal. 
    this is only visible if the post belongs to the currently logged in user.
    update or insert post on modal dismiss
  */
  editPost() {
    let modal = this.modalCtrl.create(NewsAddModal, { feed: this.post });
    modal.onDidDismiss((_feed: Feed) => {
      if (_feed) {
        this.feedApi.upsert(_feed).subscribe((post: Feed) => {
          this.post = Object.assign(this.post, post);
          this.commonServices.presentToast('Feed Updated')
        });
      }
    });
    modal.present();
  }

  /*
    open delete post alert control. 
    this is only visible if the post belongs to the currently logged in user.
  */
  deleteFeed() {
    if (this.post.contactId === this.user.id) {
      let confirm = this.alertCtrl.create({
        title: 'Delete Feed?',
        message: 'Confirming this action will delete feed',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => { }
          },
          {
            text: 'Delete',
            handler: () => {
              this.feedApi.deleteById(this.post.id).subscribe(() => {
                this.navCtrl.pop();
                this.commonServices.presentToast('Feed Removed')
              });
            }
          }
        ]
      });
      confirm.present();
    }
  }

  getLocation() {
    if(this.post.location){
    this.placesServices.GeocodebyCords([this.post.location.lat, this.post.location.lng])
      .subscribe((response) => {
        this.location = 'Location: ' + response.results[1].formatted_address;
      }, (error) => this.commonServices.showAlert('Login Error', error.message));
    }
  }

  /*
    like/unlike post
    checks the already liked object, 
    if the object isnt undefined that means the user has liked the post therefore delete the like
    otherwise create a new like.
  */
  likeNow() {
    if (!this.alreadyLiked) {
      let like = {
        created_at: new Date(),
        created_by: this.user.id,
        feedId: this.post.id,
        updated_at: new Date(),
        updated_by: this.user.id,
        contactId: this.user.id
      }
      this.likeApi.create(<any>like).subscribe((result: Like) =>
        this.likeApi.findById(result.id, {
          include: ['contact', 'feed']
        }).subscribe((_like: Like) => {
          this.post.likes.push(_like)
          this.alreadyLiked = _like;
        })
      );
    } else {
      this.likeApi.deleteById(this.alreadyLiked.id).subscribe(result => {
        this.post.likes.splice(this.post.likes.indexOf(this.alreadyLiked), 1);
        this.alreadyLiked = undefined;
      });
    }
  }

  /*
    open like modal to view list of likers
    reload post of dismiss
 */
  likePost() {
    let modal = this.modalCtrl.create(NewsLikesComponent, { feed: this.post });
    modal.onDidDismiss(data => {
      this.reloadPost();
    });
    modal.present();
  }

  /*
      open comment modal to add a new comment or delete an existing comment
      reload post of dismiss
   */
  commentPost() {
    let modal = this.modalCtrl.create(NewsCommentsComponent, { feed: this.post });
    modal.onDidDismiss(data => {
      this.reloadPost();
    });
    modal.present();
  }

  /*
    use ionic native social sharing plugin to enable social sharing.
    http://ionicframework.com/docs/v2/native/social-sharing/
  */
  sharePost() {
    this.socialSharing.share(this.post.title, this.post.content, null, this.post.url).then(() => {
    }).catch((error) => {
      this.commonServices.showAlert("Error", error.message)
    });
  }

  /*
    open preferences popover to allow selection of a post view preference
  */
  openPrefs(ev) {
    let popover = this.popoverCtrl.create(NewsDetailOptionsPopover, this.prefs, { enableBackdropDismiss: false });
    popover.onDidDismiss(data => {
      this.prefs = data;
    });
    popover.present({
      ev: ev
    });
  }


}

@Component({
  template: `
  <div>
  <ion-list radio-group [(ngModel)]="view">
  <ion-list-header>
    Post View
  </ion-list-header>
  <ion-item>
    <ion-label>Classic</ion-label>
    <ion-radio value="classic"></ion-radio>
  </ion-item>
  <ion-item>
    <ion-label>Showcase</ion-label>
    <ion-radio value="showcase"></ion-radio>
  </ion-item>
  </ion-list>
<button ion-button block (click)="close({view:view})">Save & Close</button>
</div>
  `
})
export class NewsDetailOptionsPopover {
  view: string;

  constructor(private navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.view = this.navParams.data.view;
    }
  }
  close(data) {
    this.viewCtrl.dismiss(data);
  }


}