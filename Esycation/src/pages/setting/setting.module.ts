import { NgModule } from '@angular/core'; 
import { IonicModule } from 'ionic-angular';
import {SettingComponent} from '../setting/setting.component';

@NgModule({
    imports:[IonicModule],
    entryComponents:[
            SettingComponent],
    declarations:[SettingComponent],
    providers:[],
}) export class SettingModule{}