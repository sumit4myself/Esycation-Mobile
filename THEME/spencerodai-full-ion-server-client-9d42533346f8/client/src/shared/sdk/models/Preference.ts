/* tslint:disable */
import {
  Contact
} from '../index';

declare var Object: any;
export interface PreferenceInterface {
  mapRadius: number;
  mapType: string;
  sortFeedBy: string;
  sortFeedOrder: string;
  sortProductBy: string;
  sortProductOrder: string;
  productsView: string;
  chatWallpaper: string;
  chat_archives: boolean;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  contactId?: any;
  contact?: Contact;
}

export class Preference implements PreferenceInterface {
  mapRadius: number;
  mapType: string;
  sortFeedBy: string;
  sortFeedOrder: string;
  sortProductBy: string;
  sortProductOrder: string;
  productsView: string;
  chatWallpaper: string;
  chat_archives: boolean;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  contactId: any;
  contact: Contact;
  constructor(data?: PreferenceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Preference`.
   */
  public static getModelName() {
    return "Preference";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Preference for dynamic purposes.
  **/
  public static factory(data: PreferenceInterface): Preference{
    return new Preference(data);
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
      name: 'Preference',
      plural: 'Preferences',
      properties: {
        mapRadius: {
          name: 'mapRadius',
          type: 'number',
          default: 500
        },
        mapType: {
          name: 'mapType',
          type: 'string',
          default: 'geocode'
        },
        sortFeedBy: {
          name: 'sortFeedBy',
          type: 'string',
          default: 'created_at'
        },
        sortFeedOrder: {
          name: 'sortFeedOrder',
          type: 'string',
          default: 'ASC'
        },
        sortProductBy: {
          name: 'sortProductBy',
          type: 'string',
          default: 'created_at'
        },
        sortProductOrder: {
          name: 'sortProductOrder',
          type: 'string',
          default: 'ASC'
        },
        productsView: {
          name: 'productsView',
          type: 'string',
          default: 'list'
        },
        chatWallpaper: {
          name: 'chatWallpaper',
          type: 'string',
          default: 'http://www.ionicity.co.uk/wp-content/uploads/2016/12/64.jpg'
        },
        chat_archives: {
          name: 'chat_archives',
          type: 'boolean',
          default: false
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
