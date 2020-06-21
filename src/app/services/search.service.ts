import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = environment.baseUrl;

  private serviceBaseUrl = this.baseUrl + 'search'

  constructor(private http : HttpClient) { }

  lightSearch(data) : Observable<any>{
    let queryParams = {
      params : new HttpParams().set('city', data["city"]).set("from", data["from"]).set("to", data["to"])
    }
    return this.http.get(this.serviceBaseUrl + '/light', queryParams);
  }

  advancedSearch(data) : Observable<any> {
      //To be implemented
      return null;
  }
}
