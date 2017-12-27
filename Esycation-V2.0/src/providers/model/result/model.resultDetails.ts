export class ResultDetails{

    id:number;
    examDate:string;
    resultDate:string
    courseId:number;
    courseName:string;
    courseCode:string;
    batchId:number;
    batchName:string;
    batchCode:string;
    subjectId:number
    subjectName:string;
    subjectCode:string;
    studentResults:Array<StudentResult>=new Array<StudentResult>();

}

export class StudentResult{
    
       id:number=null;
       studentId:number=null;
       studentImageId:number=null;
       studentName:string=null;
       studentRollNumber:number=null;
       marks:number;
   
}