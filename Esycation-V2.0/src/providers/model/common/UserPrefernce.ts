/* tslint:disable */

declare var Object: any;

export interface UserPrefernceInterface {
  
   schoolId : number;
   sessionYearId : number ;
   branchId : number;
   deviceId :number;
   tokenId:string;
   userId: number;
   remoteId:number;
   module:string;
   level:string;
   fullName:string;
   email:string;
}

export class UserPrefernce implements UserPrefernceInterface {
  
   tokenId : any = null;
   schoolId : number = null;
   sessionYearId : number =null;
   branchId : number =null;
   userId: number = null;
   deviceId :number = null;
   module:string =null;
   remoteId:number=null;
   level:string;
   user: any = null;
   fullName:string=null;
   email:string=null;
   loginUsers = new Array<any>();

  constructor(data?: UserPrefernceInterface) {
        Object.assign(this, data);
    }
    
    public static factory(data?: UserPrefernceInterface): UserPrefernce{
        return new UserPrefernce(data);
    }
    
}