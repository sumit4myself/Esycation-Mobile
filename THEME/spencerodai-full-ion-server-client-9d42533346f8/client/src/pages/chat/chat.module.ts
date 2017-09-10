import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { ChatComponent } from './chat.component';
import { ChatContactsComponent } from './chat-contacts/chat-contacts.component';
import { ChatConversationsComponent } from './chat-conversations/chat-conversations.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatSettingsComponent } from './chat-settings/chat-settings.component';
import { EditChatUserComponent } from './chat-settings/edit-user.component';
import { CustomPipesModule } from '../../shared/pipes/custom-pipes.module';
import { CustomDirectivesModule } from '../../shared/directives/custom-directives.module';

@NgModule({
    imports: [
        IonicModule,
        MomentModule,
        CustomPipesModule,
        CustomDirectivesModule
    ],
    entryComponents: [
        ChatComponent,
        ChatContactsComponent,
        ChatConversationsComponent,
        ChatMessagesComponent,
        ChatSettingsComponent,
        EditChatUserComponent
    ],
    declarations: [
        ChatComponent,
        ChatContactsComponent,
        ChatConversationsComponent,
        ChatMessagesComponent,
        ChatSettingsComponent,
        EditChatUserComponent,
    ],
    providers: [],
})
export class ChatModule { }
