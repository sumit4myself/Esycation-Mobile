/* tslint:disable */
import {
  Contact
} from '../index';

declare var Object: any;
export interface FriendInterface {
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  friendId?: any;
  contactId?: any;
  contact?: Contact;
}

export class Friend implements FriendInterface {
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  friendId: any;
  contactId: any;
  contact: Contact;
  constructor(data?: FriendInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Friend`.
   */
  public static getModelName() {
    return "Friend";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Friend for dynamic purposes.
  **/
  public static factory(data: FriendInterface): Friend{
    return new Friend(data);
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
      name: 'Friend',
      plural: 'Friends',
      properties: {
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
        friendId: {
          name: 'friendId',
          type: 'any'
        },
        contactId: {
          name: 'contactId',
          type: 'any'
        },
      },
      relations: {
        contact: {
          name: 'contact',
          type: 'Contact',
          model: 'Contact'
        },
      }
    }
  }
}
