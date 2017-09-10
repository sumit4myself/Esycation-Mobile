/* tslint:disable */

declare var Object: any;
export interface LoopBackFilter {
  fields?: any;
  include?: any;
  limit?: any;
  order?: any;
  skip?: any;
  offset?: any;
  where?: any;
}
export interface AccessTokenInterface {
  
   schoolId ?: number;
   sessionYearId ?: number ;
   branchId ?: number;
   deviceId ?:number;
   tokenId?:string;
   userId?: number;
}

export class AccessToken implements AccessTokenInterface {
 
   schoolId : number=null;
   sessionYearId : number =null;
   branchId : number=null;
   deviceId :number=null;
   tokenId:string='';
   userId: number=null;
   user: any = null;
   loginUsers: Array<any> = null;
  
  constructor(data?: AccessTokenInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AccessToken`.
   */
  public static getModelName() {
    return "AccessToken";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AccessToken for dynamic purposes.
  **/
  public static factory(data: AccessTokenInterface): AccessToken{
    return new AccessToken(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'UserPrefernce',
      plural: 'UserPrefernces',
      properties: {
        tokenId: {
          name: 'tokenId',
          type: 'any'
        },
        schoolId: {
          name: 'schoolId',
          type: 'number'
        },
        sessionYearId: {
          name: 'sessionYearId',
          type: 'number',
        },
        branchId: {
          name: 'branchId',
          type: 'number'
        },
        userId: {
          name: 'userId',
          type: 'number'
        },
      },
      relations: {
        user: {
          name: 'user',
          type: 'User',
          model: 'User'
        },
         loginUsers: {
          name: 'UserPrefernce',
          type: 'Array',
          model: 'UserPrefernce'
        },
      }
    }
  }
}

export class UserPrefernce implements AccessTokenInterface {
  
   tokenId : any = null;
   schoolId : number = null;
   sessionYearId : number =null;
   branchId : number =null;
   userId: number = null;
   deviceId :number = null;
   user: any = null;
   module:string =null;
   remoteId:number=null;
   loginUsers = new Array<any>();

  constructor(data?: AccessTokenInterface) {
        Object.assign(this, data);
    }  
}


export interface StatFilter {
    range: string,
    custom?: {
      start: string,
      end: string
    },
    where?: {},
    groupBy?: string
}
