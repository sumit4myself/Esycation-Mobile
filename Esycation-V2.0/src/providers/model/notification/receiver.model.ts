
export interface ReceiversInterface{
    
      id?:number;
      message?:string;
      readStatus:string;
    }
    export class Receivers implements ReceiversInterface{
      id:number=null;
      message:string=null;
      readStatus:string=null;
      constructor(){}
      
    }