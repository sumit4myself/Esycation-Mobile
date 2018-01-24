import { Template } from '../notification/template.model';
import { Receivers } from '../notification/receiver.model';
export class BulkNotificationView {

    id: number = null
    schoolId: number = null;
    schoolName: string = null;
    branchName: string = null;
    branchId: number = null;
    createdOn: string = null;
    createdBy: string = null;
    updatedOn: string = null;
    updatedBy: string = null;
    template: Template = new Template();
    resources: any = null;
    receivers: Array<Receivers> = new Array<Receivers>();
    approved: boolean;
    bulk: boolean;
    selections: any = null;
    selectionValues: SelectionValues = new SelectionValues();
    pushTime: string = null;
    expiryTime: string = null;
    type: string = null;
    iconTitle: String = null;
    iconColor: string = null;

    constructor() {

    }
}

export class SelectionValues {

    groups: Array<any> = new Array<any>();
    courses: Array<any> = new Array<any>();
    batches: Array<any> = new Array<any>();
    students: Array<any> = new Array<any>();
    departments: Array<any> = new Array<any>();
    staffs: Array<any> = new Array<any>();

}

