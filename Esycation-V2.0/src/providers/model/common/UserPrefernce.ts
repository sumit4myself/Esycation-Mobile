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
  
   private static  instance:UserPrefernce;
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

    private constructor(data?: UserPrefernceInterface) {
        Object.assign(this, data);
    }
    
    public static getInstance(data?: UserPrefernceInterface): UserPrefernce{

        if(!UserPrefernce.instance){
             UserPrefernce.instance = new  UserPrefernce(data);
        }
        return UserPrefernce.instance;
    }
    
}