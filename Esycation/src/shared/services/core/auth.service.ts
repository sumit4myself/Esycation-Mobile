/* tslint:disable */
declare var Object: any;
import { Injectable, Inject } from '@angular/core';
import { InternalStorage } from '../../storage/storage.swaps';
import { UserPrefernce } from '../../models/baseModel/BaseModels';
/**
* @author Anjit
* @module UserAuthantication
* @description
* This module handle user Authantication connections and return singleton instances for each
* connection.
**/
@Injectable()
export class UserAuth {
  /**
   * @type {UserPrefernce}
   **/
  private userPrefernce: UserPrefernce = new UserPrefernce();

  /**
   * @type {string}
   **/
  protected prefix: string = '$LoopBackSDK$';

  /**
   * @method constructor
   * @param {InternalStorage} storage Internal Storage Driver
   * @description
   * The constructor will initialize the token loading data from storage
   **/
  constructor(@Inject(InternalStorage) protected storage: InternalStorage) {
    
    this.userPrefernce.userId         = this.load('userId');
    this.userPrefernce.schoolId       = this.load("schoolId");
    this.userPrefernce.sessionYearId  = this.load("sessionYearId");
    this.userPrefernce.branchId       = this.load("branchId");
    this.userPrefernce.deviceId       = this.load("deviceId");
    this.userPrefernce.module         = this.load("module");
    this.userPrefernce.remoteId       = this.load("remoteId");
    this.userPrefernce.user           = this.load('user');
    this.userPrefernce.loginUsers     = this.load("loginUsers");

  }
 
  /**
   * @method setUser
   * @param {any} user Any type of user model
   * @return {void}
   * @description
   * This method will update the user information and persist it 
   **/
  public setUser(user: any) {
    this.userPrefernce.user = user;
    this.save();
  }
  /**
   * @method setUserPrefernce
   * @param {userPrefernce} userPrefernce UserPrefernce or casted userPrefernce instance 
   * @return {void}
   * @description
   * This method will set a user details
   **/
  public setUserPrefernce(userPrefernce: UserPrefernce): void {
    this.userPrefernce = Object.assign(this.userPrefernce, userPrefernce);
    this.save();
  }
  /**
   * @method getToken
   * @return {void}
   **/
  public getUserPrefernce(): UserPrefernce {
    return <UserPrefernce> this.userPrefernce;
  }
  /**
   * @method getAccessTokenId
   * @return {string}
   * @description
   * This method will return the actual token string, not the object instance.
   **/
  public getAccessTokenId(): string {
    return this.userPrefernce.tokenId;
  }
  /**
   * @method getCurrentUserId
   * @return {any}
   * @description
   * This method will return the current user id, it can be number or string.
   **/
  public getCurrentUserId(): any {
    return this.load("userId");
  }

  public addAccount(userDetails:any):void{

    let loginUsers  = this.load("loginUsers");
    if(loginUsers==null){
      loginUsers = new Array<any>();
    }
    loginUsers.push(userDetails);
    let _userDetails: any = {
        user: userDetails,
        schoolId:userDetails.schoolId,
        sessionYearId:userDetails.sessionYear.id,
        branchId:userDetails.branchId,
        userId:userDetails.id,
        deviceId:userDetails.deviceId,
        module:userDetails.usersServiceMap.module,
        remoteId:userDetails.usersServiceMap.remoteId,
        tokenId:userDetails.tokenId,
        loginUsers:loginUsers
    };
    Object.assign(this.userPrefernce, _userDetails);  
    this.save();
  }
  
  public switchAccount(userDetails:any):boolean{

    Object.assign(this.userPrefernce, userDetails);  
    this.save();
    return true;
  }

  public setToken(token: any): void {
    
      let loginUsers  = this.load("loginUsers");
      if(loginUsers==null){
        loginUsers = new Array<any>();
      }
      loginUsers.push(token);
      let _userDetails: any = {
          user: token,
          schoolId:token.schoolId,
          sessionYearId:token.sessionYear.id,
          branchId:token.branchId,
          userId:token.id,
          deviceId:token.deviceId,
          tokenId:token.tokenId,
          module:token.usersServiceMap.module,
          remoteId:token.usersServiceMap.remoteId,
          loginUsers:loginUsers
      };
      Object.assign(this.userPrefernce, _userDetails);  
      this.save();
  }
  /**
   * @method getCurrentUserData
   * @return {any}
   * @description
   * This method will return the current user instance.
   **/
  public getCurrentUserData(): any {
    return (typeof this.userPrefernce.user === 'string') ? JSON.parse(this.userPrefernce.user) : this.userPrefernce.user;
  }
  /**
   * @method save
   * @return {boolean} Wether or not the information was saved
   * @description
   * This method will save in either local storage or cookies the current credentials.
   * But only if rememberMe is enabled.
   **/
  public save(): boolean {

    this.persist('schoolId',this.userPrefernce.schoolId);
    this.persist('sessionYearId',this.userPrefernce.sessionYearId);
    this.persist('branchId',this.userPrefernce.branchId);
    this.persist('userId', this.userPrefernce.userId);
    this.persist('tokenId',this.userPrefernce.tokenId);
    this.persist('deviceId',this.userPrefernce.deviceId);
    this.persist('module',this.userPrefernce.module);
    this.persist('remoteId',this.userPrefernce.remoteId);
    this.persist('user', this.userPrefernce.user);
    this.persist('loginUsers',this.userPrefernce.loginUsers);

    return true;    
  };

  public findAllUsers():Array<any>{
    return this.load("loginUsers");
  }
  
  public findByUserId(userId:number):UserPrefernce{
    
    let users  = this.load("loginUsers");
    for(let user of users){
        if(user.id==userId){
          return this.userPrefernce;
        }
    }
  }
  
 
  /**
   * @method load
   * @param {string} prop Property name
   * @return {any} Any information persisted in storage
   * @description
   * This method will load either from local storage or cookies the provided property.
   **/
  public load(prop: string): any {
    return this.storage.get(`${this.prefix}${prop}`);
  }

  public logOut(userId:number):void{
      
    var users = this.load("loginUsers");
    let index = 0;
    for(let user of users){
        if(user.id==userId){
          users.splice(index,1);
          break;
        }
        index++;
       
    }
    if(users.length>0){

      let token = users[0]
        let _userDetails: any = {
          user: token,
          schoolId:token.schoolId,
          sessionYearId:token.sessionYearId,
          branchId:token.branchId,
          userId:token.id,
          deviceId:token.deviceId,
          module:token.module,
          remoteId:token.remoteId,
          tokenId:token.tokenId,
          loginUsers:users
      };
      Object.assign(this.userPrefernce, _userDetails); 
      this.persist('schoolId',this.userPrefernce.schoolId);
      this.persist('sessionYearId',this.userPrefernce.sessionYearId);
      this.persist('branchId',this.userPrefernce.branchId);
      this.persist('userId', this.userPrefernce.userId);
      this.persist('tokenId',this.userPrefernce.tokenId);
      this.persist('deviceId',this.userPrefernce.deviceId);
      this.persist('module',this.userPrefernce.module);
      this.persist('remoteId',this.userPrefernce.remoteId);
      this.persist('user', this.userPrefernce.user);
      this.persist('loginUsers',this.userPrefernce.loginUsers);
    }
    else{
      this.clear();
    }
  }
  /**
   * @method clear
   * @return {void}
   * @description
   * This method will clear cookies or the local storage.
   **/
  public clear(): void {
    Object.keys(this.userPrefernce).forEach((prop: string) => this.storage.remove(`${this.prefix}${prop}`));
    this.userPrefernce = new UserPrefernce();
  }
  /**
   * @method clear
   * @return {void}
   * @description
   * This method will clear cookies or the local storage.
   **/
  protected persist(prop: string, value: any): void {
    try {
      this.storage.set(
        `${this.prefix}${prop}`,
        (typeof value === 'object') ? JSON.stringify(value) : value
      );
    }
    catch(err) {
      console.error('Cannot access local/session storage:', err);
    }
  }
}
