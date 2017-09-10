/* tslint:disable */
import {
  Contact,
  Feed
} from '../index';

declare var Object: any;
export interface LikeInterface {
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  contactId?: any;
  feedId?: any;
  productId?: any;
  contact?: Contact;
  feed?: Feed;
}

export class Like implements LikeInterface {
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  contactId: any;
  feedId: any;
  productId: any;
  contact: Contact;
  feed: Feed;
  constructor(data?: LikeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Like`.
   */
  public static getModelName() {
    return "Like";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Like for dynamic purposes.
  **/
  public static factory(data: LikeInterface): Like{
    return new Like(data);
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
      name: 'Like',
      plural: 'Likes',
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
        contactId: {
          name: 'contactId',
          type: 'any'
        },
        feedId: {
          name: 'feedId',
          type: 'any'
        },
        productId: {
          name: 'productId',
          type: 'any'
        },
      },
      relations: {
        contact: {
          name: 'contact',
          type: 'Contact',
          model: 'Contact'
        },
        feed: {
          name: 'feed',
          type: 'Feed',
          model: 'Feed'
        },
      }
    }
  }
}
