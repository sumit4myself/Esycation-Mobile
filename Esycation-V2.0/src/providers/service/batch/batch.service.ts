import {Injectable,Inject} from '@angular/core';
import {Http} from '@angular/http';
import { ServerConfig } from '../../config';
import {Observable} from 'rxjs/Rx';
import { CostumErrorHandler } from '../core/error.service';
import {BaseService} from '../core/base.service';
import {CommonServices} from '../common/common.service';
import {UserSessionService} from '../../service/core/user.session.service';
import {Batch,TimetableTransormer} from '../../model/batch/model.batch';
import * as moment from "moment";

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

    public findBatchAllowedByCourseIds(courseId:number,viewName:string):Observable<any>{
        
        let url: string = ServerConfig.getPath() 
        +"/batches/findByCourseIds/"+courseId+"?RESPONSE_VIEW="+viewName+"&page=1&&size=1000&restricted=true"; 
        return this.findAll(url);
    }


    public findBatchTimetablesByStudentId(studentId:number):Observable<any>{
        
        let url: string = ServerConfig.getPath() 
        +"batchTimetables/findByStudentId/"+studentId+"?suppressError=true&RESPONSE_VIEW=BatchTimetable.Details"; 
        return this.findAll(url);
    }

    public findTodayBatchTimetablesByStudentId(studentId:number):Observable<any>{
        
        let url: string = ServerConfig.getPath() 
        +"batchTimetables/findByStudentId/"+studentId+"?suppressError=true&RESPONSE_VIEW=BatchTimetable.Details"; 
        let observable = Observable.create(observer => {
            this.findAll(url).subscribe(
              data => {
                let day = moment().day();
                observer.next(TimetableTransormer.transformToDayTimetable(data, day));
                observer.complete();
              },
              error => {
                observer.next(null);
                observer.complete();
                console.log(error);
              }
            );
          });
          return observable;
    }
}