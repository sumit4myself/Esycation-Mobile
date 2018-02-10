export class StaffHistory {

    id: number = null;
    name: string = null;
    gender: string = null;
    address1: string = null;
    address2: string = null;
    city: string = null;
    state: string = null;
    pinCode: string = null;
    mobile: string = null;
    email: string = null;
    dob: string = null;
    inTime: string = null;
    outTime: string = null;
    adharNumber: string = null;
    imageId: number = null;
    bloodGroup: string = null;
    parentId: string = null;
    staffId: string = null;
    createdOn: string = null;
    approvalStatus: string = null;
    comments: string = null;
    documents: any = null;

    constructor() { }
}

export class StaffHistoryDetails {

    oldData: StaffHistory = new StaffHistory();
    newData: StaffHistory = new StaffHistory();
    constructor() { }
}