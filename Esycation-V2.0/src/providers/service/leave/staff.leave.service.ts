import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/base.service';
import { StaffLeaveDetails } from '../../model/leave/model.staffLeave';

@Injectable()
export class StaffLeaveService extends BaseService<StaffLeaveDetails> {


    constructor( @Inject(Http) protected http: Http,
        @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    ) {
        super(http, errorHandler);
    }

    public saveStaffLeave(data: any): Observable<any> {

        let url: string = ServerConfig.getPath() + "/staffLeaves";

        return this.save(url, data);
    }

    public findRemaining(remoteId: number): Observable<any> {
        let url: string = ServerConfig.getPath() + "/staffLeaveDefinitions//remaining/" + remoteId + "?RESPONSE_VIEW=StaffLeaveDefinition.Remaining";
        return this.findAll(url);
    }



}