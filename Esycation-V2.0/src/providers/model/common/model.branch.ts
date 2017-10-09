declare var Object: any;
export class Branch{

    id:number=null;
    name:string=null;
    code:string=null;
    schoolId:number=null;
    schoolName:string=null;
    branchName:string=null;
    contactDetailsId:ContactDetails=new ContactDetails();

    constructor(data?: any) {
        Object.assign(this, data);
    }  

}

export class ContactDetails{

    id:number=null;
    phoneNumber1:any=null;
    addressLine1:string=null;
    city:string=null;
    state:string=null;
    pinCode:number=null;
}