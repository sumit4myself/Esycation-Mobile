import { Injectable, Inject } from '@angular/core';
import { IO } from './io.service';
import { UserAuth } from './auth.service';
import { ServerConfig } from '../../lb.config';


import { BaseModels } from '../../models/custom/base.models';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module RealTime
* @license MIT
* @description
* This module is a real-time interface for using socket connections, its main purpose
* is to make sure that when there is a valid connection, it will create instances
* of the different real-time functionalities like FireLoop, PubSub and IO.
**/
@Injectable()
export class RealTime {
  public IO: IO;
  private connecting: boolean = false;
  private onReadySubject: Subject<string> = new Subject<string>();
  private sharedOnReady: Observable<string> = this.onReadySubject.asObservable().share();
  /**
  * @method constructor
  * @param {SocketConnection} connection WebSocket connection service
  * @param {SDKModels} models Model provider service
  * @param {LoopBackAuth} auth LoopBack authentication service
  * @description
  * It will intialize the shared on ready communication channel.
  **/
  constructor(
    @Inject(BaseModels) protected models: BaseModels,
    @Inject(UserAuth) protected auth: UserAuth
  ) {
    this.sharedOnReady.subscribe();
  }
 

}
