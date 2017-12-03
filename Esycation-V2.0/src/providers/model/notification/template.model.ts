
export interface TemplateInterface{
    
    id:number;
    name:string;
    subject:string;
    application:string;
    code:string;
    action:string;
    mode:string;
    content:string;
    htmlContent:string;
    status:Status;
    placeholders :any;
    actionParams:any;
    resources?:any;
  
  }
  
  export class Template implements TemplateInterface {
  
    id:number=null;
    name:string=null;
    subject:string=null;
    application:string=null;
    code:string=null;
    action:string=null;
    mode:string=null;
    content:string=null;
    htmlContent:string=null;
    status:Status=null;
    placeholders :any=null;
    actionParams:any=null;
    resources?:any=null;
    
    constructor(){}
  
  }

  export enum Status {
    A, I, D
}