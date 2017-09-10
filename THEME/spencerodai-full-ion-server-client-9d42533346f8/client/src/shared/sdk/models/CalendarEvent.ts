/* tslint:disable */

declare var Object: any;
export interface CalendarEventInterface {
  type?: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  all_day?: boolean;
  recurrence?: string;
  color?: string;
  url?: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  contactId?: any;
}

export class CalendarEvent implements CalendarEventInterface {
  type: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  all_day: boolean;
  recurrence: string;
  color: string;
  url: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  contactId: any;
  constructor(data?: CalendarEventInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CalendarEvent`.
   */
  public static getModelName() {
    return "CalendarEvent";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CalendarEvent for dynamic purposes.
  **/
  public static factory(data: CalendarEventInterface): CalendarEvent{
    return new CalendarEvent(data);
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
      name: 'CalendarEvent',
      plural: 'CalendarEvents',
      properties: {
        type: {
          name: 'type',
          type: 'string'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        start: {
          name: 'start',
          type: 'Date'
        },
        end: {
          name: 'end',
          type: 'Date'
        },
        all_day: {
          name: 'all_day',
          type: 'boolean',
          default: true
        },
        recurrence: {
          name: 'recurrence',
          type: 'string'
        },
        color: {
          name: 'color',
          type: 'string'
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
      }
    }
  }
}
