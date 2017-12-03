
import {Injectable,Inject} from '@angular/core';
import {Http} from '@angular/http';
import { ServerConfig } from '../../config';
import {Observable} from 'rxjs/Rx';
import { CostumErrorHandler } from '../core/error.service';
import {BaseService} from '../core/base.service';
import {CommonServices} from '../common/common.service';
import {UserSessionService} from '../../service/core/user.session.service';
import {Department} from '../../model/department/model.department';

@Injectable()
export class DepartmentService extends BaseService<Department>{

    constructor(@Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService) protected userSessionService:UserSessionService,
    @Inject (CommonServices) protected commonServices:CommonServices){
      super(http,errorHandler);
   }

   findByBranchIds(branchId:number,viewName:string):Observable<any>{

    let url: string = ServerConfig.getPath() 
    +"/departments/findByBranchIds/"+branchId+"?RESPONSE_VIEW="+viewName+"&sort=name&page=1&&size=1000"; 
    return this.findAll(url);

   }
}