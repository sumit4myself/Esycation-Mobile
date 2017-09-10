import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {HomeComponent} from '../default/home/home.componet';

@NgModule({
    imports: [
        IonicModule
    ],
    entryComponents: [HomeComponent],
    declarations: [HomeComponent],
    providers: [],
})
export class DefaultModule { }
