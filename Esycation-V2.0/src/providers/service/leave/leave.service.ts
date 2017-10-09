import {Injectable,Inject,Optional} from '@angular/core'
import { Http, Response } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler} from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import {BaseService} from '../core/base.service';
import {LeaveModel} from '../../model/leave/model.leave';

@Injectable()
export class LeaveService  extends BaseService<LeaveModel> {

    
  constructor(@Inject(Http) protected http: Http,
      @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler){
      super(http,errorHandler);
  }


  public saveLeave(data:any):Observable<any>{

    let url: string = ServerConfig.getPath() +"/studentLeaves";

    return this.save(url,data);
  }

}