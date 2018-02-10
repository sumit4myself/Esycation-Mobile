export class GuardianHistory {

    id: number = null;
    name: string = null;
    gender: string = null;
    dob: string = null;
    bloodGroup: string = null;
    occupation: string = null;
    adharNumber: string = null;
    annualIncome: string = null;
    mobile: string = null;
    email: string = null;
    imageId: number = null;
    contactDetailId: any = null;
    parentId: number = null;
    guardianId: number = null;
    createdOn: string = null;
    approvalStatus: any = null;
    comments: string = null;
    address1: string = null;
    address2: string = null;
    city: string = null;
    state: string = null;
    pinCode: string = null;
    constructor() { }
}

export class GuardianHistoryDetails {

    oldData: GuardianHistory = new GuardianHistory();
    newData: GuardianHistory = new GuardianHistory();
    constructor() { }
}