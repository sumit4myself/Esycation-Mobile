export class StudentAssessmentDetails{

    id:number=null;
    courseId:number=null;
    courseName:string=null;
    courseCode:string=null;
    batchId:number=null
    batchAssessementId:number=null;
    batchName:string=null;
    batchCode:string=null;
    subjectId:number=null;
    subjectName:string=null
    subjectCode:string=null;
    resultStatus:string=null;
    studentAssessements:Array<StudentAssessement>=new Array<StudentAssessement>();
}

export class StudentAssessement{

    studentId:number=null;
    studentName:string=null;
    studentRollNumber:number=null;
    assessements:Array<Assessement>=new Array<Assessement>();

}

export class Assessement{

    assessmentConfigurationId:number=null;
    rating:number=null;
    name:string=null;
    childs:Array<Assessement>=new Array<Assessement>();


}


