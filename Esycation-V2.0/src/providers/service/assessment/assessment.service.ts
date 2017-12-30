
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { CostumErrorHandler } from '../../service/core/error.service';
import { BaseService } from '../core/base.service';
import { Observable } from 'rxjs/Rx';
import { ServerConfig } from '../../../providers/config';
import { StudentAssessmentDetails } from '../../model/assessment/model.assessmentDetails';
@Injectable()
export class AssessmentService extends BaseService<StudentAssessmentDetails>{



    constructor( @Inject(Http) protected http: Http,
        @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler) {
        super(http, errorHandler)
    }

    findByBatchAssessementId(assessmentId: number): Observable<any> {

        let url: string = ServerConfig.getPath() +
            "/studentAssessments/findByBatchAssessementId/" + assessmentId + "?RESPONSE_VIEW=StudentAssessment.Details";

        return this.findAll(url);
    }

    draftAssessment(assessmentDetails: StudentAssessmentDetails): Observable<any> {

        let url: string = ServerConfig.getPath() + "/studentAssessments/"+assessmentDetails.batchAssessementId;
        return this.update(url, assessmentDetails);
    }

    publishAssessment(assessmentDetails: StudentAssessmentDetails): Observable<any> {

        let url: string = ServerConfig.getPath() + "/studentAssessments/"+assessmentDetails.batchAssessementId;;
        return this.update(url, assessmentDetails);
    }

    findPendingStudentAssessment(remotId: number): Observable<any> {

        let url: string = ServerConfig.getPath() + "/studentAssessments/" +
            "findPendingStudentAssessment/" + remotId + "?page=1&size=100&RESPONSE_VIEW=StudentAssessment.Summary";

        return this.findAll(url)
    }

    findCompletedStudentAssessment(remotId: number): Observable<any> {

        let url: string = ServerConfig.getPath() + "/studentAssessments/" +
            "findCompletedStudentAssessment/" + remotId + "?page=1&size=100&RESPONSE_VIEW=StudentAssessment.Summary";

        return this.findAll(url)
    }
}