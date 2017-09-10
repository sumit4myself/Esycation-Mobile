import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { CommonServices } from '../../shared/services/common.service';
import { Contact, ContactApi, Friend, FriendApi } from '../../shared/sdk';
import { ProfileContactsComponent } from './profile/profile.component';

@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeopleComponent {

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
    private friendApi: FriendApi
  ) {
    this.user = commonServices.currentUser;
  }
  ionViewDidEnter() {
    if (!this.contacts) {
      this.loading = this.loadingCtrl.create({
        content: 'Searching for People...'
      }); this.loading.present();
    }
    this.getContacts();
  }

  initializeItems(value) {
    this.contacts = [...value];
  }

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

  gotoProfile(contact) {
    this.navCtrl.push(ProfileContactsComponent, contact);
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
      () => {
        let index = this.contacts.findIndex(item => { return item.id === contact.id })
        this.contacts.splice(index, 1)
        this.groupContacts(this.contacts);
        this.commonServices.presentToast('New Friendship Made')
      },
      error => {
        this.commonServices.showAlert('Error', error.message);
      }
    )
  }

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
    get the current users friends, extract thier ids then write a query to return contacts where ids do not match contact friend ids.
   https://loopback.io/doc/en/lb2/Where-filter.html#inq
   "nin" property used here checks if id exists in the array of ids provided
  */
  getContacts() {
    this.friendApi.find({
      where: { and: [{ is_active: true }, { is_deleted: false }, { contactId: this.user.id }] }
    }).subscribe(
      (friends: Friend[]) => {
        let friend_ids = [];
        friends.forEach(friend => {
          friend_ids.push(friend.friendId);
        });
        friend_ids.push(this.user.id);
        this.contactApi.find({
          where: { id: { nin: friend_ids }, and: [{ is_active: true }, { is_deleted: false }] }, include: ["friends", "calendarEvents", "feed"]
        }).subscribe(
          (contacts: Contact[]) => {
            this.loading ? this.loading.dismissAll() : null;
            this.contactsBackup = contacts;
            this.initializeItems(this.contactsBackup)
            this.groupContacts(this.contacts);
          })
      },
      error => {
        this.loading ? this.loading.dismissAll() : null;
        this.commonServices.showAlert('Error', error.message);
      })
  }
}
