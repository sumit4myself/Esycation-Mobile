
export interface TemplateInterface{
    subject:string;
    resources?:any;
  }
  
  export class Template implements TemplateInterface {
  
    id:number;
    subject:string=null;
    resources:any=null;
    constructor(){}
  
  }