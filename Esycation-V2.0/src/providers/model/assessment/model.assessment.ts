export class StudentAssessmentDetails{

    id:number=null;
    sessionYearId:number=null;
    assassmentDate:string=null;
    assessmentConfigurationDetails:AssessmentConfigurationDetails= new AssessmentConfigurationDetails();
    subjectAssessements:Array<SubjectAssessement>= new Array<SubjectAssessement>();
    
}

export class AssessmentConfigurationDetails{

    id:number=null;
    name:string=null;
    courseId:number=null;
    courseName:string;
	courseCode:string;
	sessionYearId:number;
	status:string;
	frequency:string;
	assessmentConfigurations:Array<AssessmentConfiguration>=new Array<AssessmentConfiguration>();
}

export class AssessmentConfiguration{

    id:number;
	name:string;
	subjectId:number;
    subjectName:string;
	subjectCode:string;
	scorable:boolean;
	weightage:number;
	index:number;
	assessmentConfigurations:Array<AssessmentConfiguration>=new Array<AssessmentConfiguration>();
}

export class SubjectAssessement{

    id:number;
	assessmentConfiguration:AssessmentConfiguration=new AssessmentConfiguration();
	batchAssessements:Array<BatchAssessement>=new  Array<BatchAssessement>();
	resultStatus:string;
}

export class BatchAssessement{

    id:number;
	batchId:number;
    studentAssessements:Array<StudentAssessement>=new Array<StudentAssessement>();
	resultStatus:String;
	batchName:string;
	batchCode:string;
}

export class StudentAssessement{

    id:number;
	studentId:number;
	rating:number;
	studentImageId:number;
	studentName:string;
	studentRollNumber:number;
}