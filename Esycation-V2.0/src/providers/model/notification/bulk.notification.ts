export class BulkNotification {

    id: number = null;
    receivers: any = null;
    status = 'A'
    pushTime: string = null;
    resources: any = null;
    selections = new Object();
    tSelections = new Object();
    template = new Object();
    date: any;
    time: any;
    groupId: number;
    templateId: any;
    htmlContent: string;
    content: string;
    subject: string;
    mode: string;
    code: string;
    name: string;
}

export class BulkNotificationForm {

    id:number;
    receiverType: string;
    mode: string;
    date: string;
    time: string
    templateId: number;
    groups: any;
    courses: any;
    batches: any;
    guardians: any;
    students: any;
    departments: any;
    staffs: any;
    subject: string;
    htmlContent: string;
    content: string;
    type: string;
    constructor() {

    }
}