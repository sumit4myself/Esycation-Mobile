
declare var Object: any;

export interface RoleModelInterface{
 
    title:string;
    component:any;
    icon:string;
    image:boolean;
    show:boolean;
}

export class RoleModel implements RoleModelInterface{

    title:string;
    component:any;
    icon:string;
    image:boolean;
    show:boolean;
    constructor(
        title:string,
        component:any,
        icon:string,
        image:boolean,
        show:boolean){
            this.title = title;
            this.component = component;
            this.icon = icon;
            this.image = image;
            this.show = show;
        }

    public static getModelName() {
        return "RoleModel";
      }
}

