import {Receivers} from '../notification/receiver.model';
import {Template} from '../notification/template.model';



export interface NotificationDetailsInterface{

  id: number;
  resources:any;
  template?:Template;
  receivers?:Receivers;

}

export class NotificationDetails implements NotificationDetailsInterface{

    id: number=null;
    email:string =null;
    mobile:number=null;
    message:string=null;
    receiverType:string=null;
    receiverId:string=null;
    readStatus:string=null;
    resources:any=null;
    notificationId:Notification=new Notification();
    constructor(){
    }

    public static factory(): NotificationDetails{
      return new NotificationDetails();
  }  
  
}

export class Notification{

  pushTime:number=null;
  resources:any=null
  template:Template=new Template();
  type:string="INFORMATIVE";
}

