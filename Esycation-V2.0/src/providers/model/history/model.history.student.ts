export class StudentHistory {


    id: number = null;
    name: string = null;
    gender: string = null;
    mobile: string = null;
    email: string = null;
    dob: string = null;
    adharNumber: string = null;
    imageId: number = null;
    bloodGroup: string = null;
    parentId: number = null;
    studentId: number = null;
    createdOn: string = null;
    approvalStatus: string = null;
    comments: string = null;
    documents: string = null;
    nationality: string = null;
    religion: string = null;
    domicile: string = null;
    identificationMarks: string = null;
    contactDetailId: any = null;
    address1: string = null;
    address2: string = null;
    city: string = null;
    state: string = null;
    pinCode: string = null;
    motherTongue: string = null;

    constructor() { }
}

export class StudentHistoryDetails {

    oldData: StudentHistory = new StudentHistory();
    newData: StudentHistory = new StudentHistory();
    constructor() { }
}