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
    this.getToken();
    return this.http.post(this.baseUrl + 'ad/car-models', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public postAd(body): Observable<any> {
    this.getToken();
    return this.http.post(this.baseUrl + 'ad/ads', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAdImage(id): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + 'ad/ads/'+id+'/image', {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public agentRent(body): Observable<any> {
    this.getToken();
    return this.http.post(this.baseUrl + 'rent/request/availability', body, {
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
