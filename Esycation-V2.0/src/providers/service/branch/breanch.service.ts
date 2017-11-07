
import { Injectable, Inject } from '@angular/core';
import { Http} from '@angular/http';
import {BaseService} from '../core/base.service';
import { CostumErrorHandler } from '../../service/core/error.service';
import {ServerConfig} from '../../../providers/config';
import { Observable } from 'rxjs/Rx';
import {Branch} from '../../../providers/model/common/model.branch';
import {PagedResponse} from '../../model/common/PaggedResponse';
@Injectable()
export class BreanchService extends BaseService<Branch>{

    
    constructor(@Inject(Http) protected http: Http,
                @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
                ){
                super(http,errorHandler);
    }

    public findBranch(): Observable<PagedResponse>{

        let url: string = ServerConfig.getPath() +"/branches/?RESPONSE_VIEW=Branch.Details&page=1&&size=1000";
        return this.findAll(url);
    }
    
}