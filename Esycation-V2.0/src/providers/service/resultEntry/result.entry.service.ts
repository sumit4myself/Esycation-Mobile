
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CostumErrorHandler } from '../../service/core/error.service';
import { BaseService } from '../core/base.service';
import { Observable } from 'rxjs/Rx';
import { ServerConfig } from '../../../providers/config';
import { ResultDetails } from '../../../providers/model/result/model.resultDetails';

@Injectable()
export class ResultEntryService extends BaseService<ResultDetails>{



    constructor( @Inject(Http) protected http: Http,
        @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler) {
        super(http, errorHandler)
    }

    findResult(): Observable<any> {

        let url: string = ServerConfig.getPath()
        console.log("url====", url);
        return null;
    }

    findPendingMarksEntry(remotId: number): Observable<any> {

        let url: string = ServerConfig.getPath() +
            "/results/findPendingMarksEntry/" + remotId + "?RESPONSE_VIEW=Result.Details";
        return this.findAll(url);
    }

    findMarksEntry(remotId: number): Observable<any> {

        let url: string = ServerConfig.getPath() +
            "results/findMarksEntry/" + remotId + "?RESPONSE_VIEW=Result.Details";
        return this.findAll(url);
    }
    draft(resultDetails: ResultDetails): Observable<any> {

        let url: string = ServerConfig.getPath() + "/results/";
        return this.save(url, resultDetails);
    }

    publish(resultDetails: ResultDetails): Observable<any> {

        let url: string = ServerConfig.getPath() + "/results/";
        return this.save(url, resultDetails);
    }

}