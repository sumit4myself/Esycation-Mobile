import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { ProfileComponent } from './profile.component';
import { ProfileStoriesComponent } from './stories/profile-stories.component';
import { ProfileFriendsComponent } from './friends/profile-friends.component';
import { ProfileEventsComponent } from './events/profile-events.component';
import { ProfileEditComponent } from './edit/profile-edit.component';
import { CustomPipesModule } from '../../shared/pipes/custom-pipes.module';

@NgModule({
    imports: [
        IonicModule,
        MomentModule,
        CustomPipesModule
    ],
    entryComponents: [
        ProfileComponent,
        ProfileEditComponent
    ],
    declarations: [
        ProfileComponent,
        ProfileStoriesComponent,
        ProfileFriendsComponent,
        ProfileEventsComponent,
        ProfileEditComponent
    ],
    providers: [],
})
export class ProfileModule { }
