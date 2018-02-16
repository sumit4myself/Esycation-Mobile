
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

    id: number;
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

    validate(form: BulkNotificationForm, valid: boolean): Boolean {

        let isvalide = true;
        if (!valid)
            return false;
        if (form.receiverType == 'STAFF') {
            if (!form.departments)
                isvalide = false;
            if (!form.staffs)
                isvalide = false;
        }
        else if (form.receiverType == 'STUDENT') {
            if (!form.courses)
                isvalide = false;
            if (!form.batches)
                isvalide = false;
            if (!form.students)
                isvalide = false;
        }
        else if (form.receiverType == 'GROUP') {
            if (!form.groups)
                isvalide = false;
        }
        if (!form.content) {
            isvalide = false;
        }
        if (form.mode == 'EMAIL' && !form.subject) {
            isvalide = false;
        }
        else if (form.mode == 'PUSH_MESSAGE' && !form.subject) {
            isvalide = false;
        }
        return isvalide;
    }

}