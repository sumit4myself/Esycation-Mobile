import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

import { ProfileComponent } from './profile.component';
import {EditProfileComponent} from '../profile/edit/profile-edit.component'
//import { ProfileStoriesComponent } from './stories/profile-stories.component';
//import { ProfileFriendsComponent } from './friends/profile-friends.component';
//import { ProfileEventsComponent } from './events/profile-events.component';
//import { ProfileEditComponent } from './edit/profile-edit.component';


@NgModule({
    imports: [
        IonicModule,
        MomentModule
    ],
    entryComponents: [
        ProfileComponent,
        EditProfileComponent
      //  ProfileEditComponent
    ],
    declarations: [
        ProfileComponent,
        EditProfileComponent
        //ProfileStoriesComponent,
        //ProfileFriendsComponent,
        //ProfileEventsComponent,
        //ProfileEditComponent
    ],
    providers: [],
})
export class ProfileModule { }
