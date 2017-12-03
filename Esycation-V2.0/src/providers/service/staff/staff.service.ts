
import {Injectable,Inject} from '@angular/core';
import {Http} from '@angular/http';
import { ServerConfig } from '../../config';
import {Observable} from 'rxjs/Rx';
import { CostumErrorHandler } from '../core/error.service';
import {BaseService} from '../core/base.service';
import {CommonServices} from '../common/common.service';
import {UserSessionService} from '../../service/core/user.session.service';
import {Staff} from '../../model/staff/model.staff';

@Injectable()
export class StaffService extends BaseService<Staff>{

    constructor(@Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService) protected userSessionService:UserSessionService,
    @Inject (CommonServices) protected commonServices:CommonServices){
      super(http,errorHandler);
   }

   findByDepartmentIds(departmentId:number,viewName:string):Observable<any>{

    let url: string = ServerConfig.getPath() 
    +"/staffs/findByDepartmentIds/"+departmentId+"?RESPONSE_VIEW="+viewName+"&sort=name&page=1&&size=1000"; 
    return this.findAll(url);

   }
}