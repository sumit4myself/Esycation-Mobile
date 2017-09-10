/* tslint:disable */
import {
  Contact,
  Message
} from '../index';

declare var Object: any;
export interface ConversationInterface {
  is_archived: boolean;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  senderId?: any;
  recipientId?: any;
  sender?: Contact;
  recipient?: Contact;
  messages?: Message[];
}

export class Conversation implements ConversationInterface {
  is_archived: boolean;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  senderId: any;
  recipientId: any;
  sender: Contact;
  recipient: Contact;
  messages: Message[];
  constructor(data?: ConversationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Conversation`.
   */
  public static getModelName() {
    return "Conversation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Conversation for dynamic purposes.
  **/
  public static factory(data: ConversationInterface): Conversation{
    return new Conversation(data);
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
      name: 'Conversation',
      plural: 'Conversations',
      properties: {
        is_archived: {
          name: 'is_archived',
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
        senderId: {
          name: 'senderId',
          type: 'any'
        },
        recipientId: {
          name: 'recipientId',
          type: 'any'
        },
      },
      relations: {
        sender: {
          name: 'sender',
          type: 'Contact',
          model: 'Contact'
        },
        recipient: {
          name: 'recipient',
          type: 'Contact',
          model: 'Contact'
        },
        messages: {
          name: 'messages',
          type: 'Message[]',
          model: 'Message'
        },
      }
    }
  }
}
