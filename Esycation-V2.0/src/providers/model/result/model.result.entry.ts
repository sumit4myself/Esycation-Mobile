import {Exam} from '../exam/model.exam';

export class ResultDetails{

    id:number=null;
    courseId:number=null;
    courseName:string=null;
    courseCode:string=null;
    resultDate:string=null;
    resultStatus:string=null;
    sessionYearId:number=null;
    exam:Exam=new Exam();
    subjectResults:Array<SubjectResult>=new Array<SubjectResult>();

}

export class SubjectResult{

    id:number=null;
    subjectId:number=null;
    subjectName:string=null;
    subjectCode:string=null;
    examDate:string=null;
    resultDate:string=null;
    resultStatus:string=null;
    batchResults:Array<BatchResult>=new Array<BatchResult>();

}

export class BatchResult{

    id:number=null;
    batchId:number=null;
    batchName:string=null;
    batchCode:string=null;
    resultStatus:string=null;
    studentResults:Array<StudentResult>=new Array<StudentResult>();
}

export class StudentResult{
 
    id:number=null;
    studentId:number=null;
    studentImageId:number=null;
    studentName:string=null;
    studentRollNumber:number=null;

}