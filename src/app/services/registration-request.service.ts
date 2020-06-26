import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public getRegistrationRequests(): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + 'auth/auth/registration-requests', {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public confirmRegistrationRequest(body): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `auth/auth/confirm-registration-request`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public approveRegistrationRequest(body): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `auth/auth/approve-registration-request`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public denyRegistrationRequest(body): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `auth/auth/deny-registration-request`, body, {
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
