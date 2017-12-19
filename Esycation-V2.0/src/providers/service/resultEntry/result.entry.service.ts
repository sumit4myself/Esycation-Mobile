
import {Injectable,Inject} from '@angular/core';
import { Http} from '@angular/http';
import { CostumErrorHandler } from '../../service/core/error.service';
import {BaseService} from '../core/base.service';
import { Observable } from 'rxjs/Rx';
import {ServerConfig} from '../../../providers/config';
import {ResultDetails} from '../../model/result/model.result.entry';

@Injectable()
export class ResultEntryService extends BaseService<ResultDetails>{



    constructor(@Inject(Http) protected http:Http,
    @Inject(CostumErrorHandler) protected errorHandler:CostumErrorHandler){
    super(http,errorHandler)
    }

    findResult():Observable<any>{

        let url: string = ServerConfig.getPath()
        console.log("url====",url);
        return null;
    }
}