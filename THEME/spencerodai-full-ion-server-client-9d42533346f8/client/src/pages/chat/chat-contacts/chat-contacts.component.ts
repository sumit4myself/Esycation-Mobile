import { Component } from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, ContactApi, Friend, FriendApi, Conversation, ConversationApi, } from '../../../shared/sdk';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { PeopleComponent } from '../../people/people.component';

@Component({
    selector: 'chat-contacts',
    templateUrl: 'chat-contacts.html'
})
export class ChatContactsComponent {

    user: Contact
    contacts: Contact[];
    contactsBackup: Contact[];
    groupedContacts: any[] = [];
    searchToggle: any;
    loading: Loading;

    constructor(
        private navCtrl: NavController,
        private commonServices: CommonServices,
        private loadingCtrl: LoadingController,
        private contactApi: ContactApi,
        private friendApi: FriendApi,
        private conversationApi: ConversationApi
    ) {
        this.user = commonServices.currentUser;
    }

    /*
    get contacts on page entry
    */
    ionViewDidEnter() {
        this.getContacts();
    }

    /*
    save a backup copy of contacts array which is used later when working with search. 
    */
    initializeItems(value) {
        this.contacts = [...value];
    }

    /*
    get all data from backup 
    get value from search control
    search contacts for a match by firstname or lastname
    process contact into grouped contact data
    */
    searchItems(ev: any) {
        this.initializeItems(this.contactsBackup)
        let val = ev.target.value;
        if (val && val.trim() !== '') {
            this.contacts = this.contacts.filter((item) => {
                return (item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1
                    || (item.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1));
            });
        }
        this.groupContacts(this.contacts);
    }

    /*
    navigate to people component
    */
    pushPeople() {
        this.navCtrl.setRoot(PeopleComponent);
    }

    /*
    before navigating to messages component, 
    check that a conversation does not already exist.
    if it does, use go to messages component with existing conversation.
    else start new conversation
    */
    goToChat(contact) {
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
                // if conversation has been found
                this.navCtrl.push(ChatMessagesComponent, found_conversation);
            }, error => {
                // if conversation hasnt been found create one with sender and recipient details
                this.conversationApi.create(<Conversation>conversation).subscribe((created_conversation: Conversation) => {
                    this.conversationApi.findOne({
                        where: {
                            and: [{ is_active: true }, { is_deleted: false }, { id: created_conversation.id },
                            { recipientId: created_conversation.recipientId }]
                        }, include: ['sender', 'recipient', 'messages']
                    }).subscribe(
                        (found_conversation_after_creation) => {
                            //get conversation context and send it to chat page
                            if (found_conversation_after_creation) {
                                this.navCtrl.push(ChatMessagesComponent, found_conversation_after_creation);
                            }
                        })
                })
            })
    }

    /*
    group contact by first letter of thier firstname
     */
    groupContacts(contacts) {
        let sortedContacts = contacts.sort(function (a, b) {
            return (a.firstname > b.firstname) ? 1 : ((b.firstname > a.firstname) ? -1 : 0);
        });
        let currentLetter = false;
        let currentContacts = [];
        this.groupedContacts = [];
        sortedContacts.forEach(value => {
            if (value.firstname.charAt(0).toString() !== currentLetter) {
                currentLetter = value.firstname.charAt(0);
                let newGroup = {
                    letter: currentLetter,
                    contacts: []
                };
                currentContacts = newGroup.contacts;
                this.groupedContacts.push(newGroup);
            }
            currentContacts.push(value);
        });
    }

    /*
    get contacts who are your firends from db
     */
    getContacts() {
        if (!this.contacts) {
            this.loading = this.loadingCtrl.create({
                content: 'Retriving Data...'
            }); this.loading.present();
            this.contactsBackup = [];
            this.friendApi.find({
                where: { and: [{ is_active: true }, { is_deleted: false }, { contactId: this.user.id }] },
                include: ['contact']
            }).subscribe(
                (friends: Friend[]) => {
                    friends.forEach(friend => {
                        this.contactsBackup.push(friend.contact)
                    });
                    this.initializeItems(this.contactsBackup)
                    this.groupContacts(this.contacts);
                    this.loading ? this.loading.dismissAll() : null;
                },
                error => {
                    this.loading ? this.loading.dismissAll() : null;
                    this.commonServices.showAlert('Error', error.message);
                })
        }
    }
}
