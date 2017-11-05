import {Injectable,Inject} from '@angular/core';
import { Http} from '@angular/http';
import { CostumErrorHandler } from '../../service/core/error.service';
import {BaseService} from '../core/base.service';
import {Profile} from '../../model/profile/model.profile';
import { Observable } from 'rxjs/Rx';
import {ServerConfig} from '../../../providers/config';
declare var Object: any;

@Injectable()
export class ProfileService extends BaseService<Profile>{

    constructor(@Inject(Http) protected http:Http,
        @Inject(CostumErrorHandler) protected errorHandler:CostumErrorHandler){
        super(http,errorHandler)
    }

    findProfileDetails(remoteId:number,module:string):Observable<any>{

        let url: string = ServerConfig.getPath() +"profiles/"+remoteId+"/"+module;

        return this.find(url,null);
    }
    
    editProfile(data:any):Observable<any>{

        let url: string = ServerConfig.getPath() +"profiles/";
        return this.update(url,data);
    }
}