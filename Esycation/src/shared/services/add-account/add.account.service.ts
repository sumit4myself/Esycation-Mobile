/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseModels } from '../../models/custom/base.models';
import { BaseLoopBackApi } from '../core/base.service';
import { ServerConfig } from '../../lb.config';
import { UserAuth } from '../core/auth.service';
import { LoopBackFilter, UserPrefernce, AccessToken } from '../../models/baseModel/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

/**
 * Api services for the `Add multiple user account` model.
 */
@Injectable()
export class AddAcccountService extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(BaseModels) protected models: BaseModels,
    @Inject(UserAuth) protected auth: UserAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  models, auth, searchParams, errorHandler);
  }


  public addAccount(credentials: any): Observable<any> {

    let _method: string = "POST";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() + "/users/authenticate?RESPONSE_VIEW=User.Details";
    //users/authenticate?RESPONSE_VIEW=User.MobileAccount
    console.log("Add Account _url====",_url);
    let _routeParams: any = {};
    let _urlParams: any = {};
    let _postBody: any = {
      credentials: credentials
    };
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody)
      .map(
        (response: any) => {
          this.auth.addAccount(response);
          return response;
        }
      );
      return result;
  }

  public switchAccount(userId:number):boolean{

    let users =  this.auth.findAllUsers();
    let isSwitch = false;
    for(let user of users){

        if(userId==user.id){
            let _userDetails :any={
                user:user,
                schoolId:user.schoolId,
                sessionYearId:user.sessionYearId,
                branchId:user.branchId,
                userId:user.id,
                deviceId:user.deviceId,
                module:user.usersServiceMap.module,
                remoteId:user.usersServiceMap.remoteId,
                tokenId:user.tokenId,
                loginUsers:users
            };
            isSwitch=this.auth.switchAccount(_userDetails);
            break;
        }
    }   
    return isSwitch;
  }

  public findLoggedInUsers():Array<any>{

    return this.auth.findAllUsers();
  }

  /**
   * Logout a user.
   * @param {object} data Request data.
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the local storage.
   *
   * This method returns no data.
   */
  public logout(userId:number):void {
    
    return this.auth.logOut(userId);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserPrefernce`.
   */
  public getModelName() {
    return "UserPrefernce";
  }
}
