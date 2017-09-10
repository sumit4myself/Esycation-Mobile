import { Component, ViewChild, OnInit } from '@angular/core';
import { NavParams, Content, ActionSheetController } from 'ionic-angular';
import { Validators, FormControl } from '@angular/forms';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Message, Conversation, FireLoopRef, RealTime } from '../../../shared/sdk';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'chat-messages',
  templateUrl: 'chat-messages.html',
})
export class ChatMessagesComponent implements OnInit {

  user: Contact
  conversation: Conversation;
  messages: Array<Message>;
  messagesBackUp: Array<Message>;
  messageRef: FireLoopRef<Message>;
  conversationRef: FireLoopRef<Conversation>;
  searchToggle: any;
  cameraOptions: CameraOptions;
  message: FormControl;
  @ViewChild(Content) content: Content;
  
  constructor(
    private navParams: NavParams,
    private commonServices: CommonServices,
    private actionSheetCtrl: ActionSheetController,
    private rt: RealTime,
    private camera: Camera,
    private clipBoard: Clipboard
  ) { }

  ngOnInit() {
    this.user = this.commonServices.currentUser;
    this.conversation = this.navParams.data;
    this.cameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 250,
      targetHeight: 250,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.message = new FormControl('', [Validators.required]);
  }

  ionViewDidEnter() {
    this.conversationRef = this.rt.FireLoop.ref<Conversation>(Conversation);
    this.conversationRef.on('value').subscribe((instance: Conversation) => {
      this.messageRef = this.conversationRef.make(this.conversation).child<Message>('messages');
      this.messageRef.on('change', {
        where: { and: [{ is_active: true }, { is_deleted: false }] }, order: 'created_at ASC'
      }).subscribe(
        (messages: Array<Message>) => {
          this.messages = this.messagesBackUp = [...messages];
          if (messages) {
            messages.forEach(message => {
              if (message.read_at === null && message.contactId !== this.user.id) {
                message.read_at = new Date();
                this.messageRef.upsert(message).subscribe(result => { });
              }
            });
          }
        });
    });
  }

  ionViewDidLeave() {
    // if (this.conversation.messages.length === 0) {
    //   this.conversationRef.remove(this.conversation).subscribe(() => { });
    // }
  }

  searchItems(ev: any) {
    let val = ev.target.value;
    this.messages = [...this.messagesBackUp];
    if (val && val.trim() !== '') {
      this.messages = this.messages.filter((item) => {
        return (item.text.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  sendMessage(message) {
    if (this.conversation.id) {
      let messageObj = this.buildMessage(this.conversation.id, message);
      this.messageRef.create(<Message>messageObj).subscribe(
        () => {},
        error => this.commonServices.presentToast('Message failed to send'));
    }
    this.message.reset()
  }

  buildMessage(conversation_id, message, user?) {
    return {
      conversationId: conversation_id,
      read_at: null,
      sent_at: new Date(),
      text: message,
      created_by: user ? user.id : this.user.id,
      updated_by: user ? user.id : this.user.id,
      contactId: user ? user.id : this.user.id,
      created_at: new Date(),
      is_active: true,
      is_deleted: false,
      updated_at: new Date()
    }
  }

  onMessageHold(e, itemIndex, message: Message) {
    if (message.contactId === this.user.id) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Action Sheet',
        buttons: [
          {
            text: 'Copy',
            handler: () => {
              this.clipBoard.copy(message.text)
            }
          },
          {
            text: 'Delete',
            role: 'Destructive',
            handler: () => {
              message.is_deleted = true;
              this.messageRef.remove(message).subscribe((res: Message) => console.log(res.text));
              this.content.resize();
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  sendPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Send Image from',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA
            this.getPicture(this.cameraOptions);
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
            this.getPicture(this.cameraOptions);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  private getPicture(cameraOptions: CameraOptions) {
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.sendMessage('<img src="data:image/jpeg;base64,' + imageData + '" />');
    }, (error) => {
      this.commonServices.showAlert('Error', error.message, 'CLOSE');
    });
  }

}
