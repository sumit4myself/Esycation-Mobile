/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Account } from '../../models/Account';
import { Contact } from '../../models/Contact';
import { Preference } from '../../models/Preference';
import { Feed } from '../../models/Feed';
import { Friend } from '../../models/Friend';
import { Comment } from '../../models/Comment';
import { Like } from '../../models/Like';
import { CalendarEvent } from '../../models/CalendarEvent';
import { Conversation } from '../../models/Conversation';
import { Message } from '../../models/Message';
import { Product } from '../../models/Product';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Account: Account,
    Contact: Contact,
    Preference: Preference,
    Feed: Feed,
    Friend: Friend,
    Comment: Comment,
    Like: Like,
    CalendarEvent: CalendarEvent,
    Conversation: Conversation,
    Message: Message,
    Product: Product,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
