/* tslint:disable */
import { Injectable, Inject, Optional } from "@angular/core";
import { Http, Headers, Request } from "@angular/http";
import { CostumErrorHandler } from "./error.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

@Injectable()
export abstract class BaseService<T> {
  constructor(
    @Inject(Http) protected http: Http,
    @Optional()
    @Inject(CostumErrorHandler)
    protected errorHandler: CostumErrorHandler
  ) {}

  public request(
    method: string,
    url: string,
    postBody: any = {}
  ): Observable<any> {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("USER_ID", localStorage.getItem("userId"));
    headers.append("SCHOOL_ID", localStorage.getItem("schoolId"));
    headers.append("SESSION_YEAR_ID", localStorage.getItem("sessionYearId"));
    headers.append("BRANCH_ID", localStorage.getItem("branchId"));
    headers.append("LEVEL", localStorage.getItem("level"));
    headers.append("MODULE", localStorage.getItem("module"));
    headers.append("SERVICE", localStorage.getItem("service"));
    headers.append("REMOTE_ID", localStorage.getItem("remoteId"));

    let body: any;
    let postBodyKeys =
      typeof postBody === "object" ? Object.keys(postBody) : [];
    if (postBodyKeys.length === 1) {
      body = postBody[postBodyKeys[0]];
    } else {
      body = postBody;
    }

    let request: Request = new Request({
      headers: headers,
      method: method,
      url: url,
      body: body ? JSON.stringify(body) : undefined
    });
    return this.http
      .request(request)
      .map((res: any) => (res.text() != "" ? (res.json() as T) : {}))
      .catch(e => this.errorHandler.handleError(e));
  }

  public post<T>(url: string, data: T): Observable<T> {
    let requestBody: any = { data };
    let result = this.request("POST", url, requestBody).map((response: any) => {
      return response;
    });
    return result;
  }

  public put<T>(url: string, data: T): Observable<T> {
    let requestBody: any = { data };
    let result = this.request("PUT", url, requestBody).map((response: any) => {
      return response;
    });
    return result;
  }

  public get<T>(url: string): Observable<T> {
    let result = this.request("GET", url).map((response: any) => {
      return response;
    });
    return result;
  }

  public patch(url: string): Observable<T> {
    let result = this.request("PATCH", url).map((response: any) => {
      return response;
    });
    return result;
  }

  public delete(url: string, data?: T): Observable<T> {
    let requestBody: any = {};
    if (data) {
      requestBody = { data };
    }

    let result = this.request("DELETE", url, requestBody).map(
      (response: any) => {
        return response;
      }
    );
    return result;
  }

  public search<T>(url: string, data: T): Observable<T> {
    let requestBody: any = { data };
    let result = this.request("POST", url, requestBody).map((response: any) => {
      return response;
    });
    return result;
  }
}
