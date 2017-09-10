import { Component } from '@angular/core';
import { NavController, ModalController, Loading, LoadingController } from 'ionic-angular';
import { CommonServices } from '../../shared/services/common.service';
import { Contact, ContactApi } from '../../shared/sdk';
import { ProfileEditComponent } from './edit/profile-edit.component';
import { PeopleComponent } from '../people/people.component';
import { DashboardCalendarModal } from '../dashboard/dashboard-calendar/dashboard-calendar-modal.component';
import { NewsAddModal } from '../news/news-add/news-add.component';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {
  user: Contact
  contact: Contact;
  profileMenus: string = '_stories';
  loading: Loading;

  constructor(
    private navCtrl: NavController,
    private commonServices: CommonServices,
    private contactApi: ContactApi,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.user = commonServices.currentUser;
  }

  ionViewDidEnter() {
    this.getContact(this.user.id);
  }

  getContact(id) {
    if (this.contact) {
      this.loading = this.loadingCtrl.create({
        content: 'Logging In...'
      }); this.loading.present();
    }
    this.contactApi.findById(id, {
      where: { and: [{ is_active: true }, { is_deleted: false }] }, include: ['friends', 'calendarEvents']
    }).subscribe(
      (contact: Contact) => {
        this.loading ? this.loading.dismissAll() : null; //if subsequent page load loading variable will be undefined
        this.contact = contact;
      },
      error => {
        this.loading ? this.loading.dismissAll() : null;
        this.commonServices.showAlert('Error', error.message);
      })
  }

  editUser() {
    let modal = this.modalCtrl.create(ProfileEditComponent, { contact: this.contact });
    modal.onDidDismiss((contact: Contact) => {
      this.user = contact;
    });
    modal.present();
  }

  addFeed() {
    let modal = this.modalCtrl.create(NewsAddModal, { feed: false });
    modal.present();
  }

  addFriend() {
    this.navCtrl.push(PeopleComponent);
  }

  addEvent() {
    let modal = this.modalCtrl.create(DashboardCalendarModal, { calendar_event: { start: new Date() } });
    modal.present();
  }

}
