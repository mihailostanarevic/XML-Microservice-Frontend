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
    this.getToken();
    let queryParam = {
      params: new HttpParams().set("status", "RESERVED")
    }
    return this.http.get(this.baseUrl + `auth/users/${id}/requests?status=RESERVED`,{
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAgentAds(body): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + 'ad/ads/'+body.id+'/ads' ,{
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  getUsers(): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `auth/auth/users/customer`,{
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  getUsersAll(): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `auth/auth/users/all`,{
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  deleteRole(userId, roleId): Observable<any> {
    this.getToken();
    return this.http.delete(this.baseUrl + `auth/auth/users/`+userId+`/roles/`+roleId,{
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
