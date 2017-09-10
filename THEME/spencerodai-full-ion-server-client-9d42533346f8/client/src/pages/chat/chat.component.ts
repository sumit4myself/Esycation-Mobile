import { Component } from '@angular/core';
import { ChatContactsComponent } from './chat-contacts/chat-contacts.component';
import { ChatConversationsComponent } from './chat-conversations/chat-conversations.component';
import { ChatSettingsComponent } from './chat-settings/chat-settings.component';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatComponent {

   tab1Root: any;
   tab2Root: any;
   tab3Root: any;

  constructor() {

    this.tab1Root = ChatContactsComponent;
    this.tab2Root = ChatConversationsComponent;
    this.tab3Root = ChatSettingsComponent;
  }

}
