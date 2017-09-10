import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { PeopleComponent } from './people.component';
import { ProfileContactsComponent } from './profile/profile.component';
import { CustomPipesModule } from '../../shared/pipes/custom-pipes.module';

@NgModule({
    imports: [
        IonicModule,
        MomentModule,
        CustomPipesModule
    ],
    entryComponents: [
        PeopleComponent,
        ProfileContactsComponent
    ],
    declarations: [
        PeopleComponent,
        ProfileContactsComponent
    ],
    providers: [],
})
export class PeopleModule { }
