export interface StaffLeaveDetailsInterface{
  
    id:number;
    staffId:number;
    fromDate:string;
    toDate:string;
    comment:string;
    totalLeave:number;
    approvalStatus:string;
    approverComment:string;
    staffLeaves:Array<StaffLeave>;

}

export class StaffLeaveDetails implements StaffLeaveDetailsInterface{
  
    id:number=null;
    staffId:number=null;
    fromDate:string=null;
    toDate:string=null;
    comment:string=null;
    totalLeave:number=null;
    approvalStatus:string=null;
    approverComment:string=null;
    staffLeaves:Array<StaffLeave>=new Array<StaffLeave>();

    public static getInstance():StaffLeaveDetails{
        return new StaffLeaveDetails();
    }
}

export class StaffLeave{

    id:number=null;
    type:String=null;
    fromDate:string=null;
    toDate:string=null;
    totalLeave:number=null;
    remainingLeave:number=null;

}
