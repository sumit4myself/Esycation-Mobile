
import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, Loading } from 'ionic-angular';

import { UserSessionService } from '../../providers/service/core/user.session.service';
import { Chart } from 'chart.js';
import { PagedResponse } from '../../providers/model/common/PaggedResponse';

@IonicPage()
@Component({
    selector: 'home-page',
    templateUrl: 'home.html'
})
export class HomeComponent {

    @ViewChild(Nav) nav: Nav;
    loading: Loading;

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('performaceCanvas') performaceCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('weeklyAttendanceCanvas') weeklyAttendanceCanvas;
    @ViewChild('annualyAttendanceCanvas') annualyAttendanceCanvas;
    @ViewChild('lineCanvas') lineCanvas;

    barChart: any;
    performaceChart: any;
    doughnutChart: any;
    weeklyAttendanceChart: any;
    annualyAttendanceChart: any;
    lineChart: any;
    homeProfilesDetails: any[];
    pagedResponse: PagedResponse;
    myrequests: string = "pendings";

    homeItems: any[];
    itemExpandHeight: number = 100;




    eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.

    ppOptions = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Term 1', 'Term 2', 'Term 3', 'Term 4']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['English', 'Hindi', 'Maths', 'Science']
        },
        yAxis: {
            type: 'value'
        },
        // xAxis: [
        // {
        // type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // axisTick: {
        // alignWithLabel: true
        // }
        // }
        // ],
        series: [
            {
                name: 'Term 1',
                type: 'line',
                stack: 'ee',
                data: [120, 132, 101, 134]
            }, {
                name: 'Term 2',
                type: 'line',
                stack: 'ee',
                data: [118, 132, 129, 124]
            }, {
                name: 'Term 3',
                type: 'line',
                stack: 'ee',
                data: [126, 154, 143, 113]
            }, {
                name: 'Term 4',
                type: 'line',
                stack: 'ee',
                data: [124, 127, 131, 176]
            }
        ]
    };

    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }
    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }

        return events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

    // , private homeProfileService: HomeProfileService
    constructor(private session: UserSessionService) {

        this.homeItems = [{ title: "Attendance Statistics", expanded: false }, { title: "Calander", expanded: false }, { title: "Result Statistics", expanded: false }, { title: "Exams", expanded: false }, { title: "Timetable", expanded: false }, { title: "My Requests", expanded: false }];
        console.log("Home==", this.session.findModule());


    }


    fetctHomeSections() {
        var y = { "contents": [{ "id": 1, "name": "Student 94913", "gender": "Male", "email": "sumit4myself@gmail.com", "mobile": "9871965151", "admissionId": { "registrationNumber": 10744, "admissionDate": "01/08/2017", "registrations": [{ "rollNumber": 10744, "batchId": 4, "courseId": 2 }] }, "guardianId": { "id": 1, "name": "Guardian 94913", "email": "sumit4myself@gmail.com", "mobile": "9871965151", "contactDetailId": { "addressLine1": "Address line 1", "addressLine2": "Address line 2", "city": "Delhi", "state": "Delhi", "pinCode": "110092" } }, "batch": { "id": 4, "name": "Batch 32708", "code": "Batch 32708", }, "course": { "id": 2, "name": "Course 33162", "code": "Course 33162" } }, { "id": 1, "name": "Student 94913", "gender": "Male", "email": "sumit4myself@gmail.com", "mobile": "9871965151", "admissionId": { "registrationNumber": 10744, "admissionDate": "01/08/2017", "registrations": [{ "rollNumber": 10744, "batchId": 4, "courseId": 2 }] }, "guardianId": { "id": 1, "name": "Guardian 94913", "email": "sumit4myself@gmail.com", "mobile": "9871965151", "contactDetailId": { "addressLine1": "Address line 1", "addressLine2": "Address line 2", "city": "Delhi", "state": "Delhi", "pinCode": "110092" } }, "batch": { "id": 4, "name": "Batch 32708", "code": "Batch 32708", }, "course": { "id": 2, "name": "Course 33162", "code": "Course 33162" } }, { "id": 1, "name": "Student 94913", "gender": "Male", "email": "sumit4myself@gmail.com", "mobile": "9871965151", "admissionId": { "registrationNumber": 10744, "admissionDate": "01/08/2017", "registrations": [{ "rollNumber": 10744, "batchId": 4, "courseId": 2 }] }, "guardianId": { "id": 1, "name": "Guardian 94913", "email": "sumit4myself@gmail.com", "mobile": "9871965151", "contactDetailId": { "addressLine1": "Address line 1", "addressLine2": "Address line 2", "city": "Delhi", "state": "Delhi", "pinCode": "110092" } }, "batch": { "id": 4, "name": "Batch 32708", "code": "Batch 32708", }, "course": { "id": 2, "name": "Course 33162", "code": "Course 33162" } }], "metadata": { "totalElements": 73, "filteredElements": 1, "size": 10, "page": 1, "totalPages": 1 } };
        this.homeProfilesDetails = y.contents;


    }

    expandItem(item) {
        //item = item.expanded;
        this.homeItems.map((listItem) => {

            if (item.title == listItem.title) {
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
            console.log("---", listItem);
            return listItem.expanded;

        });
    }


    // fetchannualyAttendance() {

    // this.annualyAttendanceChart = new Chart(this.annualyAttendanceCanvas.nativeElement, {
    // type: 'line',
    // data: {
    // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    // datasets: [
    // {
    // backgroundColor: ["#213F48", "#213F48", "#213F48", "#213F48", "#213F48", "#213F48", "#213F48", "#213F48", "#213F48", "#213F48", "#213F48", "#213F48"],
    // data: [21, 22, 19, 23, 24, 25, 26, 28, 27, 25, 26, 28], fill: false, borderColor: "#2aacd8"
    // }
    // ]
    // },
    // options: {
    // legend: { display: false },
    // scales:
    // {
    // yAxes: [{
    // gridLines: {
    // display: false
    // }, ticks: {
    // beginAtZero: true
    // }
    // }],
    // xAxes: [{
    // gridLines: {
    // display: false
    // }
    // }]
    // },
    // }
    // });
    // }


    // weeklyAttendanceCanvas
    fetchWeeklyAttendance() {
        this.weeklyAttendanceChart = new Chart(this.weeklyAttendanceCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ["Mon", "Tue", "Thu", "Fri", "Sat"],
                datasets: [
                    {
                        backgroundColor: ["#FD9927", "#FD9927", "#FD9927", "#8AC250", "#F84041"],
                        data: [1, 1, 1, 1, 1]
                    }
                ]
            },
            options: {
                legend: { display: false },
                scales:
                    {
                        yAxes: [{
                            display: false,
                            gridLines: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
            }
        });
    }


    ionViewDidLoad() {
        this.fetctHomeSections();
        // this.fetchPerformance();
        // this.fetchWeeklyAttendance();
        // this.fetchannualyAttendance();

    }




    slides = [
        {
            title: "WELCOME",
            description: "To Educore Systems ",
            image: "./assets/img/1.jpg",
            //color: "#673ab7"
        },
        {
            title: "WELCOME",
            description: "To Educore Systems ",
            image: "./assets/1.jpg",
            color: "#007aff"
        }
    ];




}








// import { Component,ViewChild } from '@angular/core';
// import { IonicPage,Nav, Loading,NavController} from 'ionic-angular';

// import {UserSessionService} from '../../providers/service/core/user.session.service';
// import {BaseComponent} from '../baseComponent/base.component';

// @IonicPage()
// @Component({
// selector: 'home-page',
// templateUrl: 'home.html'
// })
// export class HomeComponent extends BaseComponent{
// @ViewChild(Nav) nav: Nav;
// loading: Loading;
// slides = [
// {
// title: "WELCOME",
// description: "To Educore Systems ",
// image: "./assets/img/1.jpg",
// //color: "#673ab7"
// },
// {
// title: "WELCOME",
// description: "To Educore Systems ",
// image: "./assets/1.jpg",
// color: "#007aff"
// }
// ];

// constructor( protected session:UserSessionService,
// protected navController:NavController) { 
// super(session,navController);
// console.log("Home==",this.session.findModule());
// }


// }