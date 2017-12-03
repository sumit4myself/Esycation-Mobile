
export class Student{


    id:number=null;
    name:string=null;
    registrationNo:string=null;;
    status = 'A';
    dob:any=null;
    gender:string=null;
    nationality:string=null;
    religion:string=null;
    domicile:string=null;
    motherTongue:string=null;
    identificationMarks:string=null;
    bloodGroup:string=null;
    imageId:string=null;
    email:string=null;
    mobile:string=null;
    adharNumber:string=null;
    schoolId:string=null;
    branchId:number=null;
    admissionQuotaId:number=null;
    documents:any=null;
    guardianId = new Guardian();
    parentId = new Parent();
    contactDetailId = new ContactDetail();
}


export class ContactDetail {
    id:number=null;
    mobile:string=null;
    addressLine1:string=null;
    addressLine2:string=null;
    addressLine3:string=null;
    city:string=null;
    state:string=null;
    pinCode:number=null;
  }
  
  export class Parent {
    id:number=null;
    fatherName:string=null;
    fatherOccupation:string=null;
    fatherAnnualIncome:string=null;
    fatherMobile:string=null;
    fatherEmail:string=null;
    fatherImageId:string=null;
    motherName:string=null;
    motherOccupation:string=null;
    motherAnnualIncome:number=null;
    motherMobile:string=null;
    motherEmail:string=null;
    motherImageId:number=null;
  }
  
  export class Guardian {
    id:number=null;
    name:string=null;
    gender:string=null;
    occupation:string=null;
    annualIncome:string=null;
    adharNumber:string=null;
    email:string=null;
    mobile:string=null;
    imageId:number=null;
    contactDetailSameAsStudent = false;
    contactDetailId = new ContactDetail();
    status = 'A';
  }