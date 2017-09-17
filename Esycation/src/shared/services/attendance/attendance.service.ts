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


@Injectable()
export class AttendanceService extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(BaseModels) protected models: BaseModels,
    @Inject(UserAuth) protected auth: UserAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  models, auth, searchParams, errorHandler);
  }


  public findById(id:number):Observable<any>{

    let _method: string = "GET";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() + 
    "/studentAttendances/today/"+id+"/?RESPONSE_VIEW=StudentAttendance.Details";

    let _routeParams: any = {};
    let _urlParams: any = {};
    let _postBody: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody)
      .map(
        (response: any) => {
          return response;
        }
      );
      return result;
  }

  public findStudentByBatchId(batchId:number):Observable<any>{

    let _method: string = "GET";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() +
    "/students/findByBatchIds/"+batchId+"/?RESPONSE_VIEW=Student.Details"+
    "&page=1&&size=1000";
    let _routeParams: any = {};
    let _urlParams: any = {};
    let _postBody: any = {
        data: batchId
    };
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody).map(
      (response: any) => {
        return response;
      }
    );
    return result;

  }

  public findBatchByRemoteId(remoteId:number){

      let _method: string = "GET";
      let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() +
      "/batches/findByClassTeacherIds/"+remoteId+"/?RESPONSE_VIEW=Batch.Details"+
      "&page=1&&size=1000";
      let _routeParams: any = {};
      let _urlParams: any = {};
      let _postBody: any = {};
      let result = this.request(_method, _url, _routeParams, _urlParams, _postBody).map(
        (response: any) => {
          return response;
        }
      );
      return result;
  }

  public save(data:any):Observable<any>{

    let _method: string = "POST";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() +
    "/studentAttendances";
    let _routeParams: any = {};
    let _urlParams: any = { };
    let _postBody: any = {
        data: data
    };
    console.log("URL==",_url);
    console.log(JSON.stringify(data));

    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
  }

  public update(id:number,data:any):Observable<any>{

    let _method: string = "PUT";
    let _url: string = ServerConfig.getPath() + "/" + ServerConfig.getApiVersion() +
    "/studentAttendances/"+id+"";
    let _routeParams: any = {};
    let _urlParams: any = {};
    let _postBody: any = {
        data: data
    };
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
    return result;
    
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Attendance`.
   */
  public getModelName() {
    return "AttendanceModel";
  }
}
