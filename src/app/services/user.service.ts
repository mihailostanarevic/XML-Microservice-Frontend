import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  getUsersReservedRequests(id): Observable<any> {
    let queryParam = {
      params: new HttpParams().set("status", "RESERVED")
    }
    return this.http.get(this.baseUrl + `users/${id}/requests`, queryParam);
  }

  public getAgentAds(body): Observable<any> {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
    return this.http.get(this.baseUrl + 'users/'+body.id+'/ads' ,{
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

}
