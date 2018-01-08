import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/base.service';

@Injectable()
export class ApprovelService extends BaseService<any> {


    constructor( @Inject(Http) protected http: Http,
        @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    ) {
        super(http, errorHandler);
    }

    public findPending(userId:number):Observable<any>{

        let url: string = ServerConfig.getPath() 
        +"/approvals/requests/"+userId+"?suppressError=true&page=1&size=50"; 
        return this.findAll(url);
      }
    
    public findMyRequests(userId:number):Observable<any>{
    
        let url: string = ServerConfig.getPath() 
        +"/approvals/myRequests/"+userId+"?suppressError=true&page=1&size=50";
        return this.findAll(url);
    }

    public approve(taskId: number, comment: string): Observable<any> {

        let url: string = ServerConfig.getPath()
            + "/approvals/requests/" + taskId + "/approve?comment=" + comment;

        return this.find(url);
    }

    public reject(taskId: number, comment: string): Observable<any> {

        let url: string = ServerConfig.getPath()
            + "/approvals/requests/" + taskId + "/reject?comment=" + comment;

        return this.find(url);
    }

    public findRequest(taskId: number): Observable<any> {
        let url: string = ServerConfig.getPath() + "/approvals/requests/" + taskId + "/task";
        return this.findAll(url);
    }

}