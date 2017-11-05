/* tslint:disable */
import { Injectable,Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {CommonServices} from '../../service/common/common.service';

import 'rxjs/add/observable/throw';

@Injectable()
export class CostumErrorHandler {
 
 
 constructor(
    @Inject(CommonServices) protected commonServices: CommonServices
  ) {
    this.commonServices = commonServices;
  }
 
  public handleError(error: Response): any {
    let responseJson = error.json();
    if(responseJson.exception == 'com.webientsoft.esycation.common.exception.EsycationException'){
      this.commonServices.presentToast(responseJson.message);
    }else{
      this.commonServices.showAlert("Error",JSON.stringify(error));
    }
    console.log("ERROR :",responseJson);
    
    return Observable.throw(error.json().error || 'Server error');
  }
}