import {Injectable,Inject} from '@angular/core';
import {Http} from '@angular/http';
import { ServerConfig } from '../../config';
import {Observable} from 'rxjs/Rx';
import { CostumErrorHandler } from '../core/error.service';
import {BaseService} from '../core/base.service';
import {CommonServices} from '../common/common.service';
import {UserSessionService} from '../../service/core/user.session.service';
import {Batch} from '../../model/batch/model.batch';

@Injectable()
export class BatchService extends BaseService<Batch>{

    constructor(@Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService) protected userSessionService:UserSessionService,
    @Inject (CommonServices) protected commonServices:CommonServices){
      super(http,errorHandler);
   }

   public findAllBatch(viewName:string):Observable<any>{
    
        let url: string = ServerConfig.getPath() 
        +"/batches/?RESPONSE_VIEW="+viewName+"&sort=name&page=1&&size=1000"; 
        return this.findAll(url);
    }

    public findBatchByCourseIds(courseId:number,viewName:string):Observable<any>{
        
        let url: string = ServerConfig.getPath() 
        +"/batches/findByCourseIds/"+courseId+"?RESPONSE_VIEW="+viewName+"&page=1&&size=1000"; 
        return this.findAll(url);
    }
}