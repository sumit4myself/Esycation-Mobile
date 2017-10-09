import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HomeComponent} from '../home/home';

@NgModule({
    imports: [
        IonicPageModule.forChild(HomeComponent),
    ],
    exports: [HomeComponent ],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
