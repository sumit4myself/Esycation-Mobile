import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { DashboardCalendarComponent } from './dashboard-calendar/dashboard-calendar.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
import { DashboardCalendarModal } from './dashboard-calendar/dashboard-calendar-modal.component';
import { DashboardMapComponent, MapOptionsPopover } from './dashboard-map/dashboard-map.component';
import { CustomPipesModule } from '../../shared/pipes/custom-pipes.module';

@NgModule({
    imports: [
        IonicModule,
        ChartsModule,
        CustomPipesModule
    ],
    entryComponents: [
        DashboardComponent,
        DashboardCalendarComponent, DashboardCalendarModal,
        DashboardChartsComponent,
        DashboardMapComponent, MapOptionsPopover],
    declarations: [
        DashboardComponent,
        DashboardCalendarComponent, DashboardCalendarModal,
        DashboardChartsComponent,
        DashboardMapComponent, MapOptionsPopover],
    providers: [],
})
export class DashboardModule { }
