declare var Object:any
export class AttendanceModel{

    id:number =null;
    attendanceId:number=null;
    name:string=null;
    dob:string=null;
    gender:string=null;
    mobile:string=null;
    present:boolean=false;
    absent:boolean=false;
    parentId:Parent= new Parent();
    guardianId:Guardian= new Guardian();
    contactDetailId:ContactDetail = new ContactDetail();
    admissionId:Admission=new Admission();

    constructor(){}

  public static getModelName() {
    return "AttendanceModel";
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
    courseId:number;
    batchId:number;
    attenderId:number;
    inTime:string;
    studentAttendances:Array<StudentAttendance>;
    constructor(){}

    public static getModelName() {
        return "StudentAttendanceDetails";
    }

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