import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController, Loading, PopoverController, ViewController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Feed, Like, LikeApi, FireLoopRef, RealTime } from '../../../shared/sdk';

@Component({
  selector: 'news-likes',
  templateUrl: 'news-likes.html'
})
export class NewsLikesComponent implements OnInit {

  user: Contact
  post: Feed;
  likes: Array<Like>;
  likesBackUp: Array<Like>;
  reference: FireLoopRef<Like>;
  alreadyLiked: boolean = false;
  prefs: any = { sortBy: 'created_at', sort: 'DESC' };
  loading: Loading;

  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private commonServices: CommonServices,
    private popoverCtrl: PopoverController,
    private viewCtrl: ViewController,
    private likeApi: LikeApi,
    private rt: RealTime
  ) { }

  ngOnInit() {
    this.user = this.commonServices.currentUser;
    this.post = this.navParams.get('feed');
    this.reference = this.rt.FireLoop.ref<Like>(Like);
  }

  ionViewDidEnter() {
    if (!this.likes) {
      this.loading = this.loadingCtrl.create({
        content: 'Retriving Likes...'
      }); this.loading.present();
    }
    this.getLikes();
  }

  like() {
    let like = {
      created_at: new Date(),
      created_by: this.user.id,
      feedId: this.post.id,
      updated_at: new Date(),
      updated_by: this.user.id,
      contactId: this.user.id
    }
    this.reference.create(<any>like).subscribe(() =>
      this.commonServices.presentToast('New Like Saved'));
  }
  unlike(like) {
    this.reference.remove(like).subscribe(() =>
      this.commonServices.presentToast('Feed Unliked'));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getLikes() {
    this.reference.on('change', {
      where: { and: [{ is_active: true }, { is_deleted: false }, { feedId: this.post.id }] },
      include: ['contact', 'feed'], order: this.prefs.sortBy + ' ' + this.prefs.sort
    }).subscribe((likes: Like[]) => {
      this.loading ? this.loading.dismissAll() : null;
      this.likes = this.likesBackUp = likes;
      this.likes.forEach(like => {
        if (like.contactId === this.user.id) {
          this.alreadyLiked = true;
        }
      });
    })

  }

}