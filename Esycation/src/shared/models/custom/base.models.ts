/* tslint:disable */
import { Injectable } from '@angular/core';
import { UserPrefernce } from '../../models/baseModel/BaseModels';
import {AttendanceModel} from '../../models/attendance/model.attendance';
import {NotificationDetails} from '../../models/notification/notification.model';
import {Template}  from '../../models/notification/template.model';
import {Receivers} from '../../models/notification/receiver.model';
export interface Models { [name: string]: any }

@Injectable()
export class BaseModels {

  private models: Models = {
    UserPrefernce: UserPrefernce,
    AttendanceModel:AttendanceModel,
    NotificationDetails:NotificationDetails,
    Template:Template,
    Receivers:Receivers
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
