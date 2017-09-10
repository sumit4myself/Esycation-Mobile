import { Component } from '@angular/core';
import { NavParams, LoadingController, Loading, PopoverController, ViewController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Feed, Comment, FireLoopRef, RealTime } from '../../../shared/sdk';

@Component({
  selector: 'news-comments',
  templateUrl: 'news-comments.html'
})
export class NewsCommentsComponent {

  user: Contact
  post: Feed;
  message: string;
  comments: Array<Comment>;
  commentsBackUp: Array<Comment>;
  reference: FireLoopRef<Comment>;
  loading: Loading;

  constructor(
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private commonServices: CommonServices,
    private popoverCtrl: PopoverController,
    private viewCtrl: ViewController,
    private rt: RealTime
  ) {
    this.user = commonServices.currentUser;
    this.post = navParams.get('feed');
    this.reference = this.rt.FireLoop.ref<Comment>(Comment);
  }

  ionViewDidEnter() {
    if (!this.comments) {
      this.loading = this.loadingCtrl.create({
        content: 'Retriving Comments...'
      }); this.loading.present();
    }
    this.getComments();
  }

  comment(text) {
    let comment = {
      text: text,
      created_at: new Date(),
      created_by: this.user.id,
      feedId: this.post.id,
      updated_at: new Date(),
      updated_by: this.user.id,
      contactId: this.user.id,
    }
    this.reference.create(<any>comment).subscribe();
    this.message = '';
  }

  delete(comment) {
    this.reference.remove(comment).subscribe(() =>
      this.commonServices.presentToast('Comment Deleted'));
  }

  /*search by placing the search value into a query string for the fields you want to search within.
    "or: [{ title: { like: val, options: 'i' } }, { content: { like: val, options: 'i' } }" 
    options i allows you to do a wildcard search regardless of the case (capital or lower case)
  */
  onSearch(ev: any) {
    let val = ev.target.value;
    this.comments = [...this.commentsBackUp];
    if (val && val.trim() !== '') {
      this.comments = this.comments.filter((item) => {
        return (item.text.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.contact.title.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.contact.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.contact.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getComments() {
    this.reference.on('change', {
      where: { and: [{ is_active: true }, { is_deleted: false }, { feedId: this.post.id }] },
      include: ['contact', 'feed'], order: 'created_at ' + this.user.preference.sortFeedOrder
    }).subscribe((comment: Array<Comment>) => {
      this.loading.dismissAll();
      this.comments = this.commentsBackUp = comment;
    });
  }

}
