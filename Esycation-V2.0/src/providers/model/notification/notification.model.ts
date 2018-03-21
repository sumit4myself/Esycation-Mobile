import { Receivers } from '../notification/receiver.model';
import { Template } from '../notification/template.model';



export interface NotificationDetailsInterface {

  id: number;
  resources: any;
  template?: Template;
  receivers?: Receivers;

}

export class NotificationDetails implements NotificationDetailsInterface {

  id: number = null;
  email: string = null;
  mobile: number = null;
  message: string = null;
  receiverType: string = null;
  receiverId: string = null;
  readStatus: string = null;
  resources: any = null;
  styleColor: any;
  typeInfo: any;
  notificationId: Notification = new Notification();
  constructor() {
  }

  public static factory(): NotificationDetails {
    return new NotificationDetails();
  }

}

export class Notification {

  id: number = null;
  pushTime: string = null;
  resources:any = null
  template: Template = new Template();
  type: string = "INFORMATIVE";
  expiryTime: string = null;
  selections: any = null;
  approved: boolean = false;
  bulk: boolean = true;
  receivers: Receivers = new Receivers();
  styleColor: string = null;
  typeInfo: string = null;
  


}
