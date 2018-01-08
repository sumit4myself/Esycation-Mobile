export class RequestDetails {

    id: number = null;
    studentId: string = null;
    targetId: number = null;
    processInstanceId: number = null;
    taskId: number = null;
    message: string = null;
    currentStatus: string = null;
    autoApproved: boolean;
    startedOn: string = null;
    service: string = null
    module: string = null
    api: string = null;
    currentLevel: string = null;
    totalLevel: number = null;
    escalatable: false;
    cancelable: false;
    requestor:Requestor=new Requestor();

}
export class Requestor{

    name:string=null;
    email:string=null;
    mobile:number=null;
    type:string=null
    id:number=null;
}