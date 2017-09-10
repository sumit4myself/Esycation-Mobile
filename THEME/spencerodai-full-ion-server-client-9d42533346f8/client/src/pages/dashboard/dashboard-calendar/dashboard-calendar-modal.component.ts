import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Contact, CalendarEvent } from '../../../shared/sdk';
import { CommonServices } from '../../../shared/services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'dashboard-calendar-modal',
    templateUrl: 'dashboard-calendar-modal.html'
})
export class DashboardCalendarModal {

    user:Contact
    calendar_event: CalendarEvent;
    eventsForm: FormGroup;
    colors: any[] = [
        { text: 'Green', value: '#2ecc71' },
        { text: 'Olive', value: '#283018' },
        { text: 'Marron', value: '#b56969' },
        { text: 'Cream', value: '#fae596' },
        { text: 'Brown', value: '#7d4627' },
        { text: 'Yellow', value: '#f1c40f' },
        { text: 'Blue', value: '#2980b9' },
        { text: 'Orange', value: '#e67e22' },
        { text: 'Red', value: '#e74c3c' },
        { text: 'Purple', value: '#9b59b6' },
        { text: 'Dark', value: '#2c3e50' },
        { text: 'Grey', value: '#7f8c8d' }
    ];
    event_types: string[] = ['Reminder', 'Events', 'Shopping', 'Alerts'];
    recurrences: string[] = ['Never', 'Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Yearly'];

    constructor(public params: NavParams,
        public viewCtrl: ViewController,
        private _fb: FormBuilder,
        private commonServices: CommonServices
    ) {
        this.user = this.commonServices.currentUser;
        this.calendar_event = params.get('calendar_event');
        if (!this.calendar_event.id) {
            this.calendar_event = <any>{
                color: '#2ecc71',
                all_day: true,
                recurrence: 'Never',
                start: this.calendar_event.start.toISOString(),
                end: this.calendar_event.start.toISOString(),
            }
        }
        this.eventsForm = this._fb.group({
            id: [this.calendar_event.id],
            type: [this.calendar_event.type],
            title: [this.calendar_event.title, [<any>Validators.required]],
            description: [this.calendar_event.description],
            start: [this.calendar_event.start, [<any>Validators.required]],
            end: [this.calendar_event.end, [<any>Validators.required]],
            all_day: [this.calendar_event.all_day],
            recurrence: [this.calendar_event.recurrence],
            color: [this.calendar_event.color],
            url: [this.calendar_event.url]
        });
    }

    setEvent({ value, valid }: { value: any, valid: boolean }) {
        if (value.all_day) {
            value.end = moment(value.start).endOf('day');
        }
        value.created_by = value.updated_by = value.contactId = this.commonServices.currentUser.id;
        if (value) {
            this.viewCtrl.dismiss(value);
        }
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}