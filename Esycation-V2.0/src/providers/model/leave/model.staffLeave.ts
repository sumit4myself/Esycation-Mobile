import {Type} from '../leave/model.staff.leave.defination'; 

export interface StaffLeaveDetailsInterface{
  
    id:number;
    staffId:number;
    fromDate:string;
    toDate:string;
    comment:string;
    totalLeave:number;
    approvalStatus:string;
    approverComment:string;
    type:any;

}

export class StaffLeaveDetails {
  
    id:number=null;
    staffId:number=null;
    fromDate:string=null;
    toDate:string=null;
    comment:string=null;
    totalLeave:number=null;
    approvalStatus:string=null;
    approverComment:string=null;
    type:Type=new Type();

    public static getInstance():StaffLeaveDetails{
        return new StaffLeaveDetails();
    }
}


