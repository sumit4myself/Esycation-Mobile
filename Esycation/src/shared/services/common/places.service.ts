import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { CONFIG } from '../../../app/base.url';

@Injectable()
export class PlacesServices {

    constructor(
        private http: Http
    ) { }

    GeocodebyCords(coords: number[]): Observable<any> {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords.toString() + '&key=' + CONFIG.GOOGLE_API_KEY;
        return this.http.get(url).map((response: Response) => {
            return response.json();
        }).catch(this.handleError)
    }

    GeocodebyAddress(address: string[]): Observable<any> {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address.toString() + '&key=' + CONFIG.GOOGLE_API_KEY;
        return this.http.get(url).map((response: Response) => {
            return response.json();
        }).catch(this.handleError)
    }

    private handleError(error:Response){
        return Observable.throw(error.statusText);
    }

}