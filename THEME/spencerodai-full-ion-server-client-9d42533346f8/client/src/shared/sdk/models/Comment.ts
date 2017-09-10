/* tslint:disable */
import {
  Feed,
  Contact
} from '../index';

declare var Object: any;
export interface CommentInterface {
  text?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  feedId?: any;
  contactId?: any;
  feed?: Feed;
  contact?: Contact;
}

export class Comment implements CommentInterface {
  text: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  feedId: any;
  contactId: any;
  feed: Feed;
  contact: Contact;
  constructor(data?: CommentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Comment`.
   */
  public static getModelName() {
    return "Comment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Comment for dynamic purposes.
  **/
  public static factory(data: CommentInterface): Comment{
    return new Comment(data);
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
      name: 'Comment',
      plural: 'Comments',
      properties: {
        text: {
          name: 'text',
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
        feedId: {
          name: 'feedId',
          type: 'any'
        },
        contactId: {
          name: 'contactId',
          type: 'any'
        },
      },
      relations: {
        feed: {
          name: 'feed',
          type: 'Feed',
          model: 'Feed'
        },
        contact: {
          name: 'contact',
          type: 'Contact',
          model: 'Contact'
        },
      }
    }
  }
}
