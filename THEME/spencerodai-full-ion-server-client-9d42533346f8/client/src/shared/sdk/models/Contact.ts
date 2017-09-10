/* tslint:disable */
import {
  Account,
  Preference,
  Feed,
  Friend,
  CalendarEvent
} from '../index';

declare var Object: any;
export interface ContactInterface {
  firstname?: string;
  lastname?: string;
  othernames?: string;
  title?: string;
  picture?: string;
  gender?: string;
  address?: string;
  town?: string;
  country?: string;
  chat_headline?: string;
  postal_code?: string;
  email?: string;
  phone?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  accountId?: any;
  account?: Account;
  preference?: Preference;
  feed?: Feed[];
  friends?: Friend[];
  calendarEvents?: CalendarEvent[];
}

export class Contact implements ContactInterface {
  firstname: string;
  lastname: string;
  othernames: string;
  title: string;
  picture: string;
  gender: string;
  address: string;
  town: string;
  country: string;
  chat_headline: string;
  postal_code: string;
  email: string;
  phone: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  accountId: any;
  account: Account;
  preference: Preference;
  feed: Feed[];
  friends: Friend[];
  calendarEvents: CalendarEvent[];
  constructor(data?: ContactInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Contact`.
   */
  public static getModelName() {
    return "Contact";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Contact for dynamic purposes.
  **/
  public static factory(data: ContactInterface): Contact{
    return new Contact(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Contact',
      plural: 'Contacts',
      properties: {
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
        },
        othernames: {
          name: 'othernames',
          type: 'string'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        picture: {
          name: 'picture',
          type: 'string'
        },
        gender: {
          name: 'gender',
          type: 'string'
        },
        address: {
          name: 'address',
          type: 'string'
        },
        town: {
          name: 'town',
          type: 'string'
        },
        country: {
          name: 'country',
          type: 'string'
        },
        chat_headline: {
          name: 'chat_headline',
          type: 'string'
        },
        postal_code: {
          name: 'postal_code',
          type: 'string'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        phone: {
          name: 'phone',
          type: 'string'
        },
        is_active: {
          name: 'is_active',
          type: 'boolean',
          default: true
        },
        is_deleted: {
          name: 'is_deleted',
          type: 'boolean',
          default: false
        },
        created_at: {
          name: 'created_at',
          type: 'Date'
        },
        updated_at: {
          name: 'updated_at',
          type: 'Date'
        },
        updated_by: {
          name: 'updated_by',
          type: 'string'
        },
        created_by: {
          name: 'created_by',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        accountId: {
          name: 'accountId',
          type: 'any'
        },
      },
      relations: {
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account'
        },
        preference: {
          name: 'preference',
          type: 'Preference',
          model: 'Preference'
        },
        feed: {
          name: 'feed',
          type: 'Feed[]',
          model: 'Feed'
        },
        friends: {
          name: 'friends',
          type: 'Friend[]',
          model: 'Friend'
        },
        calendarEvents: {
          name: 'calendarEvents',
          type: 'CalendarEvent[]',
          model: 'CalendarEvent'
        },
      }
    }
  }
}
