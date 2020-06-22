import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class CreateAdService {
  private baseUrl = environment.baseUrl;
  subscriptionUser: Subscription;
  activeUserToken: string;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public getAllCarModels(body): Observable<any> {
    return this.http.post(this.baseUrl + 'ad/car-models', body);
  }

  public postAd(body): Observable<any> {
    return this.http.post(this.baseUrl + 'ad/ads', body);
  }

  public getAdImage(id): Observable<any> {
    return this.http.get(this.baseUrl + 'ad/ads/'+id+'/image');
  }

  public agentRent(body): Observable<any> {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
    return this.http.post(this.baseUrl + 'rent/request/availability', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }
}
