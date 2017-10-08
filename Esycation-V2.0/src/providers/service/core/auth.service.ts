declare var Object: any;
import { Injectable, Inject } from '@angular/core';
import { Http} from '@angular/http';
import {BaseService} from '../core/base.service';
import { CostumErrorHandler } from './error.service';
import {UserPrefernce,UserPrefernceInterface} from '../../model/common/UserPrefernce';
import {ServerConfig} from '../../../providers/config';
import { Observable } from 'rxjs/Rx';
import {LocalStorage} from '../../storage/local.storage';


@Injectable()
export class AuthService extends BaseService<UserPrefernce> {

    userPrefernceInterface:UserPrefernceInterface;
    private userPrefernce=UserPrefernce.factory(this.userPrefernceInterface);
    constructor(@Inject(Http) protected http: Http,
                @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
                @Inject(LocalStorage) private storage:LocalStorage){
                super(http,errorHandler);
    


                console.log("auth service userId===", this.load('userId'));

                this.userPrefernce.userId         = this.load('userId');
                this.userPrefernce.schoolId       = this.load("schoolId");
                this.userPrefernce.sessionYearId  = this.load("sessionYearId");
                this.userPrefernce.branchId       = this.load("branchId");
                this.userPrefernce.deviceId       = this.load("deviceId");
                this.userPrefernce.module         = this.load("module");
                this.userPrefernce.remoteId       = this.load("remoteId");
                this.userPrefernce.user           = this.load('user');
                this.userPrefernce.level          = this.load("level");
                this.userPrefernce.loginUsers     = this.load("loginUsers");   
                
    }

    public findCurrentUserDetails():UserPrefernce{

        return this.userPrefernce;
    }

    public switchAccount(userId:number):void{

        let users =  this.load("loginUsers");
        for(let user of users){
    
            if(userId==user.id){

                let userDetails = this.toJson(user);
                userDetails.loginUsers=users;
                Object.assign(this.userPrefernce, userDetails); 
                this.savetoStorage();
                break;
            }
        }   
    }

    public login(loginDetails: any): Observable<any> {
        
        let _method: string = "POST";
        let _url: string = ServerConfig.getPath() +"/users/authenticate?RESPONSE_VIEW=User.Details";
        let _postBody: any = {
            loginDetails:loginDetails
        };
        let result = this.request(_method, _url, _postBody).map(
          (response: any) => {
            this.setUserDetails(response);  
            return response;
          }
        );
        return result;      
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
    
          let user = users[0];
          let userDetails = this.toJson(user);
          userDetails.loginUsers=users;
          Object.assign(this.userPrefernce, userDetails); 
          this.savetoStorage();
        }
        else{
          this.clearStorage();
        }
    }    

    protected setUserDetails(details: any) {
        

        let loginUsers  =this.load("loginUsers");
        if(loginUsers==null){
          loginUsers = new Array<any>();
        }
       loginUsers.push(details);
       let userDetails = this.toJson(details);
       userDetails.loginUsers=loginUsers;

        Object.assign(this.userPrefernce,userDetails);  
        this.savetoStorage();
        
    }

    protected savetoStorage():void{
        
        this.persist('schoolId',this.userPrefernce.schoolId);
        this.persist('sessionYearId',this.userPrefernce.sessionYearId);
        this.persist('branchId',this.userPrefernce.branchId);
        this.persist('userId', this.userPrefernce.userId);
        this.persist('tokenId',this.userPrefernce.tokenId);
        this.persist('deviceId',this.userPrefernce.deviceId);
        this.persist('module',this.userPrefernce.module);
        this.persist('remoteId',this.userPrefernce.remoteId);
        this.persist('user', this.userPrefernce.user);
        this.persist("level",this.userPrefernce.level);
        this.persist('loginUsers',this.userPrefernce.loginUsers);
    }

    protected persist(prop: string, value: any): void {
       
        this.storage.set(prop,(typeof value ==='object')?JSON.stringify(value):value);
    }

    public load(prop: string): any {
        
        let value = this.storage.get(prop);
        if(value){
            return value;
        }
        else
            return null;
    }

    protected clearStorage(): void {
        Object.keys(this.userPrefernce).forEach((prop: string) => this.storage.remove(prop));
        this.userPrefernce = new UserPrefernce();
    }
   
    protected toJson(userDetails:any): any{

        let _userDetails: any = {
            user: userDetails,
            schoolId:userDetails.schoolId,
            sessionYearId:userDetails.sessionYearId,
            branchId:userDetails.branchId,
            userId:userDetails.id,
            deviceId:userDetails.deviceId,
            module:userDetails.module,
            remoteId:userDetails.remoteId,
            tokenId:userDetails.tokenId,
            level:userDetails.level,
        };
        return _userDetails;
    }

}