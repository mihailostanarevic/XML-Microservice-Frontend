import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public rateAd(body) : Observable<any>{
    return this.http.post(this.baseUrl + `ads/ratings`, body);
  }

  public getAllRatingsBySimpleUser(id) : Observable<any>{
    return this.http.get(this.baseUrl + `ads/ratings/${id}/simple-user`);
  }

  public getAllRatingsByAd(id) : Observable<any>{
    return this.http.get(this.baseUrl + `ads/ratings/${id}/ad`);
  }

  public getAvgRatingByAd(id) : Observable<any>{
    return this.http.get(this.baseUrl + `ads/ratings/avg/${id}/ad`);
  }
}
