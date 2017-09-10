import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { Contact, CalendarEvent, CalendarEventApi } from '../../../shared/sdk';

@Component({
  selector: 'profile-events',
  templateUrl: 'profile-events.html'
})
export class ProfileEventsComponent {

  user:Contact
  calendarEvents: CalendarEvent[];
  calendarEventsBackup: CalendarEvent[];
  constructor(
    private commonServices: CommonServices,
    private calendarEventApi: CalendarEventApi,
    private alertCtrl: AlertController
  ) {
    this.user = commonServices.currentUser;
    this.getCalendarEvents();
  }

  getCalendarEvents() {
    this.calendarEventApi.find({
      where: { and: [{ is_active: true }, { is_deleted: false }, { contactId: this.user.id }] }
    }).subscribe(
      (calendarEvents: CalendarEvent[]) => {
        this.calendarEventsBackup = calendarEvents;
        this.initializeItems(this.calendarEventsBackup)
      },
      error => {
        this.commonServices.showAlert('Error', error.message);
      })
  }

  deleteEvent(event, i) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Event?',
      message: 'Confirming this action will delete event from calendar',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.calendarEventApi.deleteById(event.id).subscribe(() => {
              this.getCalendarEvents();
            }, (error) => { this.commonServices.showAlert('Error', error.message); })
          }
        }
      ]
    });
    confirm.present();

  }

  initializeItems(value) {
    this.calendarEvents = [...value];
  }

  searchItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems(this.calendarEventsBackup);
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.calendarEvents = this.calendarEvents.filter((item) => {
        return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.title.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.type.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
