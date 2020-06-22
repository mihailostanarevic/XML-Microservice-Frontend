import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public sendRequest(body): Observable<any> {
    return this.http.post(this.baseUrl + 'rent-request', body);
  }

  public getRequests(body): Observable<any> {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
    return this.http.get(this.baseUrl + 'users/'+body.id+'/requests/'+body.requestStatus, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAgentRequests(body): Observable<any> {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
    return this.http.get(this.baseUrl + 'agent/'+body.id+'/requests/'+body.requestStatus, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public approveRequest(body): Observable<any> {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
    return this.http.get(this.baseUrl + 'agent/'+body.id+'/requests/'+body.resID+"/approve", {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public payRequest(body): Observable<any> {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
    return this.http.put(this.baseUrl + 'users/'+body.id+'/requests/'+body.requestID+"/pay",body ,{
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public dropRequest(body): Observable<any> {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
    return this.http.put(this.baseUrl + 'users/'+body.id+'/requests/'+body.requestID+"/drop",body ,{
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }
}

