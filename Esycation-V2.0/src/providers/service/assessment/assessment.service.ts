
import {Injectable,Inject} from '@angular/core';
import { Http} from '@angular/http';
import { CostumErrorHandler } from '../../service/core/error.service';
import {BaseService} from '../core/base.service';
import { Observable } from 'rxjs/Rx';
import {ServerConfig} from '../../../providers/config';
import {StudentAssessmentDetails} from '../../model/assessment/model.assessmentDetails';
@Injectable()
export class AssessmentService extends BaseService<StudentAssessmentDetails>{



    constructor(@Inject(Http) protected http:Http,
    @Inject(CostumErrorHandler) protected errorHandler:CostumErrorHandler){
    super(http,errorHandler)
    }

    findResult():Observable<any>{

        let url: string = ServerConfig.getPath()
        console.log("url====",url);
        return null;
    }

    draftAssessment(assessmentDetails:StudentAssessmentDetails):Observable<any>{

        let url: string = ServerConfig.getPath() +"/assessmentRating/";
        return this.save(url,assessmentDetails);
    }
    
    publishAssessment(assessmentDetails:StudentAssessmentDetails):Observable<any>{

        let url: string = ServerConfig.getPath() +"/assessmentRating/"+assessmentDetails.id;
        return this.update(url,assessmentDetails);
    }

}