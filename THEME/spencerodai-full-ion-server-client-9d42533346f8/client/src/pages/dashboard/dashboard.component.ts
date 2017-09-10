import { Component } from '@angular/core';
import { DashboardCalendarComponent } from './dashboard-calendar/dashboard-calendar.component';
import { DashboardMapComponent } from './dashboard-map/dashboard-map.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardComponent {

  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = DashboardChartsComponent;
    this.tab2Root = DashboardCalendarComponent;
    this.tab3Root = DashboardMapComponent;
  }

}
