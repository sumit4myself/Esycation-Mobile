import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { SettingsComponent } from './settings.component';
import { CustomPipesModule } from '../../shared/pipes/custom-pipes.module';

@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        CustomPipesModule
    ],
    entryComponents: [SettingsComponent],
    declarations: [SettingsComponent],
    providers: [],
})
export class SettingsModule { }
