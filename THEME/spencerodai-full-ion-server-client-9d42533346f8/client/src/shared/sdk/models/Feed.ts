/* tslint:disable */
import {
  Contact,
  Comment,
  Like
} from '../index';

declare var Object: any;
export interface FeedInterface {
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  images?: Array<string>;
  location?: any;
  url?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  contactId?: any;
  contact?: Contact;
  comments?: Comment[];
  likes?: Like[];
}

export class Feed implements FeedInterface {
  type: string;
  title: string;
  subtitle: string;
  content: string;
  images: Array<string>;
  location: any;
  url: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  contactId: any;
  contact: Contact;
  comments: Comment[];
  likes: Like[];
  constructor(data?: FeedInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Feed`.
   */
  public static getModelName() {
    return "Feed";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Feed for dynamic purposes.
  **/
  public static factory(data: FeedInterface): Feed{
    return new Feed(data);
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
      name: 'Feed',
      plural: 'Feeds',
      properties: {
        type: {
          name: 'type',
          type: 'string',
          default: 'news'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        subtitle: {
          name: 'subtitle',
          type: 'string'
        },
        content: {
          name: 'content',
          type: 'string'
        },
        images: {
          name: 'images',
          type: 'Array&lt;string&gt;'
        },
        location: {
          name: 'location',
          type: 'any'
        },
        url: {
          name: 'url',
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
        comments: {
          name: 'comments',
          type: 'Comment[]',
          model: 'Comment'
        },
        likes: {
          name: 'likes',
          type: 'Like[]',
          model: 'Like'
        },
      }
    }
  }
}
