/* tslint:disable */
import { Injectable,Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {CommonServices} from "../../services/common/common.service"
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/throw';
/**
 * Default error handler
 */


 
@Injectable()
export class ErrorHandler {
 
 
 constructor(
    @Inject(CommonServices) protected commonServices: CommonServices
  ) {
    this.commonServices = commonServices;
  }
 
 
  // ErrorObservable when rxjs version < rc.5
  // ErrorObservable<string> when rxjs version = rc.5
  // I'm leaving any for now to avoid breaking apps using both versions
  public handleError(error: Response): any {
    let responseJson = error.json();
    if(responseJson.exception == 'com.webientsoft.esycation.common.exception.EsycationException'){
      this.commonServices.presentToast(responseJson.message);
    }else{
      this.commonServices.showAlert("Error",JSON.stringify(error));
    }
    return Observable.throw(error.json().error || 'Server error');
  }
}
