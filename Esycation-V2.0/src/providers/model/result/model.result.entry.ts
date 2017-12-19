import {Exam} from '../exam/model.exam';

export class ResultDetails{

    exam:Array<Exam>=new Array<Exam>();
    courseId:number;
    batchId:number;
    status:string;
}

export class Result{
    
    id:number = null;
    studentId:number = null;
    studentName:string =null;
    rollNumber:number = null;
    dob:string = null;
    marks = new Array();
    name:string = null;
    attend:string = "PRESENT";
}