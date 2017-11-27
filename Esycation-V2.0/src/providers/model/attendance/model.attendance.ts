
export class AttendanceModel{

    id:number =null;
    studentId:number=null;
    attendanceId:number=null;
    name:string=null;
    dob:string=null;
    gender:string=null;
    mobile:string=null;
    imageId:string=null;
    present:boolean=false;
    absent:boolean=false;
    parentId:Parent= new Parent();
    guardianId:Guardian= new Guardian();
    contactDetailId:ContactDetail = new ContactDetail();
    admissionId:Admission=new Admission();

    constructor(){}

    public static factory(): AttendanceModel{
        return new AttendanceModel();
    }  
}
export class Parent{
    id:number=null;
    fatherName:string=null;
    motherName:string=null;
}

export class Guardian{
    id:number=null;
    name:string=null;

}

export class ContactDetail{
    addressLine1:string=null;
    city:string=null;
    state:string=null;
    pinCode:number=null;
}

export class Admission{
    registrationNumber:number=null;
    admissionDate:string=null;
    registrations:Registration=new Registration();
}
export class Registration{
    rollNumber:number;
    batchId:number;
    courseId:number;
}

//this model will save or update data to server
export class StudentAttendanceDetails{

    id:number;
    branchId:number;
    courseId:number;
    batchId:number;
    attenderId:number;
    inTime:string;
    date:string;
    createdBy:string;
    createdOn:string;
    studentAttendances:Array<StudentAttendance>;
    constructor(){}


    public static factory(): StudentAttendanceDetails{
        return new StudentAttendanceDetails();
    }  
}
export class StudentAttendance{

    id:number;
    studentId:number;
    outTime:string;
    present:boolean;
}

export class Attendance{

    id:number=null;
    attendanceId:number=null;
    inTime:string=null;
    courseId:number=null;
    batchId:number=null;
    date:string=null;
    createdBy:string=null;
    createdOn:string=null;

}