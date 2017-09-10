import {Receivers} from '../../models/notification/receiver.model';
import {Template} from '../../models/notification/template.model';

declare var Object: any;

export interface NotificationDetailsInterface{

  id: number;
  resources:any;
  template?:Template;
  receivers?:Receivers;

}

export class NotificationDetails implements NotificationDetailsInterface{

    id: number=null;
    email:null;
    mobile:null;
    message:null;
    receiverType:null;
    receiverId:null;
    readStatus:null;
    resources:any=null;
    notificationId:NotificationId=new NotificationId();
    constructor(data?:NotificationDetailsInterface){
    }
    public static getModelDefinition() {
        return {
          name: 'notification',
          plural: 'notifications',
          properties: {
            id: {
              name: 'id',
              type: 'number'
            },
            pushTime:{
              name: 'pushTime',
              type: 'any'
            },
            resources:{
              name: 'resources',
              type: 'any'
            },
            template:{
              name: 'template',
              type: 'Template'
            },
            receivers:{
              name: 'receivers',
              type: 'Receivers'
            }
        }
      }
    }
}

export class NotificationId{

  pushTime:number=null;
  resources:any=null
  template:Template=new Template();
}

