import {Receivers} from '../notification/receiver.model';
import {Template} from '../notification/template.model';

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

    public static factory(): NotificationDetails{
      return new NotificationDetails();
  }  
  
}

export class NotificationId{

  pushTime:number=null;
  resources:any=null
  template:Template=new Template();
}

