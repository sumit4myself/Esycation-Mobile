export class ResultDetails {

    id: number = null;
    batchResultId: number = null;
    examDate: string = null;
    resultDate: string = null;
    courseId: number = null;
    courseName: string = null;
    courseCode: string = null;
    batchId: number = null;
    batchName: string = null;
    batchCode: string = null;
    subjectId: number = null;
    subjectName: string = null;
    subjectCode: string = null;
    resultStatus: string = null;
    marks: number = null;
    studentResults: Array<StudentResult> = new Array<StudentResult>();
    
    constructor(){
        
    }

}

export class StudentResult {

    id: number = null;
    studentId: number = null;
    studentImageId: number = null;
    studentName: string = null;
    studentRollNumber: number = null;
    marks: number = null;
    error: string = null;

}