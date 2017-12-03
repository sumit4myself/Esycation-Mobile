
export interface ReceiversInterface{
    
      id?:number;
      message?:string;
      readStatus:string;
      
      email:string;
      mobile:string;
      receiverType:string;
      receiverId:number;
      notificationId:any;
      notificationStatus:string; 
      retries:any;
      placeholders:any;
      actionParams:any;
    }
    export class Receivers implements ReceiversInterface{
      id:number=null;
      message:string=null;
      readStatus:string=null;
      email:string=null;
      mobile:string=null;
      receiverType:string=null;
      receiverId:number=null;
      notificationId:any=null;
      notificationStatus:string=null; 
      retries:any=null;
      placeholders:any=null;
      actionParams:any=null;
      
      constructor(){}
      
    }