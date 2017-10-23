declare var Object: any;
import { Injectable, Inject } from '@angular/core';
import { Http} from '@angular/http';
import {BaseService} from '../core/base.service';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import {ServerConfig} from '../../../providers/config';
import {StudentAttendanceDetails} from '../../model/attendance/model.attendance';
import {PagedResponse} from '../../model/common/PaggedResponse';

@Injectable()
export class AttendanceService extends BaseService<StudentAttendanceDetails>{
  
  
      constructor(@Inject(Http) protected http: Http,
                  @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
                 ){
                  super(http,errorHandler);
                }
          
      public findStudentByBatchId(batchId:number):Observable<PagedResponse>{
                  
        let url: string = ServerConfig.getPath() +
        "/students/findByBatchIds/"+batchId+"/?RESPONSE_VIEW=Student.Details&page=1&&size=1000";
                
          return this.findAll(url);
      }
      
      public findBatchByRemoteId(remoteId:number):Observable<PagedResponse>{
        
              
          let url: string = ServerConfig.getPath()+
          "/batches/findByClassTeacherIds/"+remoteId+"/?RESPONSE_VIEW=Batch.Details&page=1&&size=1000";
              
         return this.findAll(url);
      }


      public findTodayAttendance(id:number):Observable<any>{

        let url: string = ServerConfig.getPath()+
        "/studentAttendances/today/"+id+"/?RESPONSE_VIEW=StudentAttendance.Details";
        return this.findAll(url);

      }

      public saveAttendance(data:any):Observable<any>{
          
           let url: string = ServerConfig.getPath()+"/studentAttendances";
          return this.save(url,data);
      }

      public updateAttendance(id:number,data:any):Observable<any>{
        
            let url: string = ServerConfig.getPath() +"/studentAttendances/"+id+"";
          return this.update(url,data);   
      }
  
  }      