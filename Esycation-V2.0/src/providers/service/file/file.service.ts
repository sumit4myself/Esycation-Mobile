import { Injectable, Inject } from '@angular/core'
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/base.service';
import { FileDetails } from '../../model/file/model.file';

@Injectable()
export class FileService extends BaseService<FileDetails>{

    constructor(@Inject(Http) protected http: Http,
        @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    ) {
        super(http, errorHandler);
    }

    uploadFile(data: any): Observable<any> {

        let url: string = ServerConfig.getPath()
        //return this.save(url, data);
        console.log(data, url)
        return null;
    }
}