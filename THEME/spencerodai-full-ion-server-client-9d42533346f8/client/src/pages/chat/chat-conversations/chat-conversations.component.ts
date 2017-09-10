import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { ChatContactsComponent } from '../chat-contacts/chat-contacts.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { Contact, Conversation, ConversationApi, FireLoopRef, RealTime } from '../../../shared/sdk';

@Component({
  selector: 'chat-conversations',
  templateUrl: 'chat-conversations.html'
})
export class ChatConversationsComponent {

  user: Contact;
  conversations: Array<Conversation>;
  conversationsBackUp: Array<Conversation>;
  reference: FireLoopRef<Conversation>;
  pushPage: any;
  loading: Loading;

  constructor(
    private navCtrl: NavController,
    private commonServices: CommonServices,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private conversationApi: ConversationApi,
    private rt: RealTime
  ) {
    this.pushPage = ChatMessagesComponent;
    this.user = commonServices.currentUser;
  }

  /*
  on view enter, load conversations
   */
  ionViewDidEnter() {
    this.reference = this.rt.FireLoop.ref<Conversation>(Conversation);
    this.reference.on('change', {
      where: {
        and: [{ is_active: true }, { is_deleted: false }, { is_archived: this.user.preference.chat_archives }],
        or: [{ senderId: this.user.id }, { recipientId: this.user.id }]
      },
      include: ['sender', 'recipient', "messages"]
    }).subscribe((messages: Array<Conversation>) => {
      this.loading ? this.loading.dismissAll() : null;
      this.conversations = this.conversationsBackUp = messages.filter(item => { return item.messages.length > 0 });
    });
  }

  searchItems(ev: any) {
    let val = ev.target.value;
    this.conversations = [...this.conversationsBackUp];
    if (val && val.trim() !== '') {
      this.conversations = this.conversations.filter((item) => {
        return (item.sender.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.sender.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.recipient.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.recipient.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /*
  go to contact page 
  */
  pushContact() {
    this.navCtrl.setRoot(ChatContactsComponent);
  }

  /*
  archive a conversation 
  */
  archiveConvo(convo: Conversation) {
    convo.is_archived ? convo.is_archived = false : convo.is_archived = true;
    this.reference.upsert(convo).subscribe(() => {
      this.commonServices.presentToast('Chat Archived')
    });
  }

  /*
  delete a conversation 
  */
  deleteConvo(convo: Conversation) {
    this.reference.remove(convo).subscribe(() => {
      this.commonServices.presentToast('Chat Deleted')
    });
  }

}
