import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public rateAd(body) : Observable<any>{
    this.getToken();
    return this.http.post(this.baseUrl + `ratings`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllRatingsBySimpleUser(id) : Observable<any>{
    this.getToken();
    return this.http.get(this.baseUrl + `ratings/${id}/simple-user`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllRatingsByAd(id) : Observable<any>{
    this.getToken();
    return this.http.get(this.baseUrl + `ratings/${id}/ad`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAvgRatingByAd(id) : Observable<any>{
    this.getToken();
    return this.http.get(this.baseUrl + `ratings/avg/${id}/ad`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  getToken(): void {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
  }
}
