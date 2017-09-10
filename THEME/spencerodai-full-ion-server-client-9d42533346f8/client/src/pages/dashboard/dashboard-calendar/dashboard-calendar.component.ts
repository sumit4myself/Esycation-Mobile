import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Loading, AlertController, Events } from 'ionic-angular';
import { CommonServices } from '../../../shared/services/common.service';
import { DashboardCalendarModal } from './dashboard-calendar-modal.component';
import { Contact, CalendarEvent, FireLoopRef, RealTime } from '../../../shared/sdk';
import * as moment from 'moment';
import { Calendar } from '@ionic-native/calendar';

@Component({
  selector: 'dashboard-calendar',
  templateUrl: 'dashboard-calendar.html'
})
export class DashboardCalendarComponent implements OnInit {

  user: Contact
  calendarEvents: Array<CalendarEvent>;
  reference: FireLoopRef<CalendarEvent>;
  selected: any;
  selectedDate: Date;
  start: any;
  colors: any[];
  month: any;
  weeks: any[] = [];
  dayEvents: CalendarEvent[] = [];
  weekDayNames: string[];
  recurrences: string[] = ['Daily', 'Weekly', 'Fortnightly', 'Monthly', 'yearly'];
  loading: Loading;
  constructor(
    private commonServices: CommonServices,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private events: Events,
    private rt: RealTime,
    private calendar: Calendar
  ) {

    this.weekDayNames = moment.weekdays();
    this.user = commonServices.currentUser;
    this.reference = this.rt.FireLoop.ref<CalendarEvent>(CalendarEvent);
  }

  ionViewDidEnter() {
    // this.ngOnInit();
  }

  ngOnInit() {
    if (!this.selected) {
      this.selected = this._removeTime(this.selected || moment());
      this.month = this.selected.clone();

      this.start = this.selected.clone();
      this.start.date(1);
      this._removeTime(this.start.day(0));
    } this.calendarEvents = [];
    this.loading = this.loadingCtrl.create({
      content: 'Retriving Calendar Data...'
    }); this.loading.present();
    this.reference.on('change', { where: { and: [{ is_active: true }, { is_deleted: false }, { contactId: this.user.id }] } })
      .subscribe((_events: Array<CalendarEvent>) => {
        this.calendarEvents = _events
        this._buildMonth(this.start, this.month, this.calendarEvents);

        // if calendar loaded for the first time get selected day and eventsfor today
        if (this.dayEvents) {
          if (this.dayEvents.length === 0) {
            this.weeks.forEach(week => {
              week.days.forEach(element => {
                if (element.isToday && moment(element.date).startOf('day').isSame(moment(new Date()).startOf('day'))) {
                  this.selected = element.date; this.dayEvents = element.events
                }
              });
            });
            this.loading.dismissAll();
          }
        }
      });
  }

  select(day) {
    this.selected = day.date;
    this.dayEvents = day.events;
  };

  next() {
    let next = this.month.clone();
    next.date(1);
    this._removeTime(next.month(next.month() + 1)).day(0);
    this.month = this.month.month(this.month.month() + 1);
    this._buildMonth(next, this.month, this.calendarEvents);
  };

  previous() {
    let previous = this.month.clone();
    this._removeTime(previous.month(previous.month() - 1).date(1));
    this.month.month(this.month.month() - 1);
    this._buildMonth(previous, this.month, this.calendarEvents);
  };

  _removeTime(date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  _buildMonth(start, month, calendar_events) {
    this.weeks = [];
    var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
    while (!done) {
      this.weeks.push({ days: this._buildWeek(date.clone(), month, calendar_events) });
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    this.events.publish("buildCalendarDone");
  }

  _buildWeek(date, month, calendar_events) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      days.push({
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(moment(new Date()).startOf('day'), 'day'),
        date: date
      });

      date = date.clone();
      date.add(1, "d");
    }
    days.forEach(element => {
      calendar_events.forEach(eventItem => {
        let _eventItem = Object.assign({}, eventItem);
        let start = moment(eventItem.start).startOf('day');
        let end = moment(eventItem.end).startOf('day');
        if (moment(element.date).isBetween(start, end, null, '[]')) {
          !element.events ? element.events = [] : null
          element.events.push(_eventItem);
          // if (element.isToday && moment(element.date).startOf('day').isSame(moment(new Date()).startOf('day'))) {
          //   this.selected = element.date; this.dayEvents = element.events
          // }
        }
      });
    });
    return days;
  }


  addEvent(_event) {
    if (!_event) {
      _event = { start: this.selected._d };
    }
    // default day events to empty if undefined
    !this.dayEvents ? this.dayEvents = [] : null;
    let modal = this.modalCtrl.create(DashboardCalendarModal, { calendar_event: _event });
    modal.onDidDismiss((_event: CalendarEvent) => {
      if (_event) {
        this.reference.upsert(_event).subscribe((instance: CalendarEvent) => {
          if (_event.id) {
            let index = this.dayEvents.findIndex(item => { return item.id === instance.id });
            this.dayEvents.splice(index, 1, instance);
            this.calendar.modifyEvent(instance.title, null, instance.description, instance.start, instance.end)
          } else {
            if (moment(this.selected).startOf('day').isSame(moment(instance.start).startOf('day'))) {
              // this.dayEvents.push(instance);
            }
            this.calendar.createEvent(instance.title, null, instance.description, instance.start, instance.end)
          }

        });
      }
    });
    modal.present();
  }

  // updateEvent(_event) {
  //   let modal = this.modalCtrl.create(DashboardCalendarModal, { calendar_event: _event });
  //   modal.onDidDismiss((_event: CalendarEvent) => {
  //     if (_event) {
  //       this.reference.upsert(_event).subscribe((instance: CalendarEvent) => {
  //         let index = this.dayEvents.findIndex(item => { return item.id === instance.id });
  //         this.dayEvents.splice(index, 1, instance);
  //         Calendar.modifyEvent(instance.title, null, instance.description, instance.start, instance.end)
  //       });
  //     }
  //   });
  //   modal.present();
  // }

  removeEvent(_event) {
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
            this.reference.remove(_event).subscribe((instance: CalendarEvent) => {
              let index = this.dayEvents.findIndex(item => { return item.id === _event.id });
              this.dayEvents.splice(index, 1);
              this.calendar.deleteEvent(instance.title, null, instance.description, instance.start, instance.end)
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
