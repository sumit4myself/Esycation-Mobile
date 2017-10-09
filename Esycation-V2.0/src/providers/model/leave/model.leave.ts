export interface Leave{

    id:number;
    studentId:number;
    fromDate:string;
    toDate:string;
    leaveType:number;
    comment:string;
    totalLeave:number
    status:string
}

export class LeaveModel implements Leave{

    id:number=null;
    studentId:number;
    fromDate:string=null;
    toDate:string=null;
    leaveType:number=null;
    comment:string=null;
    totalLeave:number;
    status:string;

}