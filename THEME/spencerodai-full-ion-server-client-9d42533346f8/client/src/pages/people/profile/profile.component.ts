import { Component } from '@angular/core';
import { NavController, Events, NavParams, ActionSheetController, Loading, LoadingController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, ContactApi, FriendApi, Friend, Feed, FeedApi, Conversation, ConversationApi } from '../../../shared/sdk';
import { ChatMessagesComponent } from '../../chat/chat-messages/chat-messages.component';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'profile-contacts',
  templateUrl: 'profile.html'
})
export class ProfileContactsComponent {

  user: Contact
  contact: Contact;
  feed: Feed[];
  rows: number[];
  profileMenus: string = '_stories';
  is_friend: boolean = false;
  loading: Loading;

  constructor(
    private events: Events,
    private navCtrl: NavController,
    private navParams: NavParams,
    private commonServices: CommonServices,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private contactApi: ContactApi,
    private friendApi: FriendApi,
    private feedApi: FeedApi,
    private conversationApi: ConversationApi,
    private callNumber: CallNumber
  ) {
    this.user = commonServices.currentUser;

    if (navParams.data) {
      this.getContact(navParams.data.id)
    } else {
      this.getContact(this.user.id);
    }
  }

  getContact(id) {
    this.loading = this.loadingCtrl.create({
      content: 'Retrieving Contact...'
    }); this.loading.present();
    this.contactApi.findById(id, {
      where: { and: [{ is_active: true }, { is_deleted: false }] }, include: [{ "friends": ["contact"] }, 'calendarEvents']
    }).subscribe(
      (contact: Contact) => {
        this.loading ? this.loading.dismissAll() : null;
        this.contact = contact;
        this.getFeed(this.contact);
        this.isFriend();
      },
      error => {
        this.commonServices.showAlert('Error', error.message);
      })
  }

  getFeed(contact) {
    this.feedApi.find({
      where: { and: [{ is_active: true }, { is_deleted: false }, { contactId: contact.id }] },
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

  isFriend() {
    this.friendApi.count({ contactId: this.user.id, friendId: this.contact.id }).subscribe((count: any) => {
      count.count === 0 ? this.is_friend = false : this.is_friend = true;
    }, (error) => { this.commonServices.showAlert('Error', error.message); });
  }

  follow(contact) {
    let friendObj = {
      contactId: this.user.id,
      created_at: new Date(),
      created_by: this.user.id,
      friendId: contact.id,
      is_active: true,
      is_deleted: false,
      updated_at: new Date(),
      updated_by: this.user.id
    }
    this.friendApi.create(friendObj).subscribe(
      (friend) => {
        this.is_friend = true;
      },
      error => {
        this.commonServices.showAlert('Error', error.message);
      }
    )
  }

  unfollow(contact) {
    this.friendApi.findOne({ where: { friendId: this.contact.id } }).subscribe(
      (friend: Friend) => {
        this.friendApi.deleteById(friend.id).subscribe(
          (friend: Friend) => {
            this.is_friend = false;
            this.events.publish('unfriended');
          },
          error => {
            this.commonServices.showAlert('Error', error.message);
          })
      },
      error => {
        this.commonServices.showAlert('Error', error.message);
      }
    )
  }

  goToChat(contact) {
    this.loading = this.loadingCtrl.create({
      content: 'Retrieving Contact...'
    }); this.loading.present();
    let conversation: any = {
      senderId: this.user.id,
      recipientId: contact.id,
      created_by: this.user.id,
      updated_by: this.user.id,
      is_archived: false,
      created_at: new Date(),
      is_active: true,
      is_deleted: false,
      updated_at: new Date()
    }
    // find message that already exists if exist go to chat page with found conversation as context
    this.conversationApi.findOne({
      where: {
        or: [
          {
            and: [{ is_active: true }, { is_deleted: false }, { senderId: conversation.senderId },
            { recipientId: conversation.recipientId }]
          },
          {
            and: [{ is_active: true }, { is_deleted: false }, { senderId: conversation.recipientId },
            { recipientId: conversation.senderId }]
          }]
      }, include: ['sender', 'recipient', 'messages']
    }).subscribe(
      (found_conversation: Conversation) => {
        this.loading.dismissAll();
        this.navCtrl.push(ChatMessagesComponent, found_conversation);
      }, error => {
        this.conversationApi.create(<Conversation>conversation).subscribe((created_conversation: Conversation) => {
          this.conversationApi.findOne({
            where: {
              and: [{ is_active: true }, { is_deleted: false }, { id: created_conversation.id },
              { recipientId: created_conversation.recipientId }]
            }, include: ['sender', 'recipient', 'messages']
          }).subscribe(
            (found_conversation_after_creation) => {
              if (found_conversation_after_creation) {
                this.loading.dismissAll();
                this.navCtrl.push(ChatMessagesComponent, found_conversation_after_creation);
              }
            })
        })
      })
  }

  callContact(contact: Contact) {
    this.callNumber.callNumber(contact.phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
