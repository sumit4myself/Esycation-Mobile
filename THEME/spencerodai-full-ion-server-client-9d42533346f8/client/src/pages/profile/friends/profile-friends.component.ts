import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, Friend, FriendApi } from '../../../shared/sdk';
import { ProfileContactsComponent } from '../../people/profile/profile.component';

@Component({
  selector: 'profile-friends',
  templateUrl: 'profile-friends.html'
})
export class ProfileFriendsComponent {

  user:Contact
  friends: Friend[];
  friendsBackup: Friend[];
  contactProfilepage: any = ProfileContactsComponent;

  constructor(
    private events: Events,
    private commonServices: CommonServices,
    private friendApi: FriendApi
  ) {
    this.user = commonServices.currentUser;
    this.getFriends();
    this.events.subscribe('unfriended', () => {
      this.getFriends();
    })
  }



  getFriends() {
    this.friendApi.find({
      where: { and: [{ is_active: true }, { is_deleted: false }, { contactId: this.user.id }] },
      include: ['contact']
    }).subscribe(
      (friends: Friend[]) => {
        this.friendsBackup = friends;
        this.initializeItems(this.friendsBackup)
      },
      error => {
        this.commonServices.showAlert('Error', error.message);
      })
  }

  initializeItems(value) {
    this.friends = [...value];
  }

  searchItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems(this.friendsBackup);
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.friends = this.friends.filter((item) => {
        return (item.contact.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.contact.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.contact.othernames.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.contact.town.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  unfriend(friend) {
    this.friendApi.deleteById(friend.id).subscribe(
      (_friend: Friend) => {
        let index = this.friendsBackup.findIndex(item => { return item.friendId === friend.friendId })
        this.friendsBackup.splice(index, 1)
        this.initializeItems(this.friendsBackup);
        this.commonServices.presentToast(friend.contact.firstname + ' is no longer your friend')
      },
      error => {
        this.commonServices.showAlert('Error', error.message);
      }
    )
  }
}
