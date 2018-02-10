export class StaffLeaveDefinition{

    id:number=null;
    name:string=null;
    leaves:Array<Leave>=new Array<Leave>();
    totalLeave:number=null;
}

export class Leave{

    id:number=null;
    type:Type=new Type();
    totalLeave:number=null;
}  

export class Type{

    id:number=null;
    name:string=null;
    totalLeave:number=null;
}
