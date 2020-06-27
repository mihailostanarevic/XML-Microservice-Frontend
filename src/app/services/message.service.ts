import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  sendMessage(body): Observable<any>{
    this.getToken();
    return this.http.post(this.baseUrl + "messages", body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  getMessagesForUser(id, idSender): Observable<any>{
    this.getToken();
    console.log(idSender);
    let queryParams = {
      params: new HttpParams().set("receiver", id).set("sender", idSender)
    }
    return this.http.get(this.baseUrl + "messages?receiver="+id+"&sender="+idSender, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  approveDenyAccessory(body): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + 'message-car-accessories', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  seen(id) : Observable<any> {
    this.getToken();
    console.log(id);
    let body = {
      seen: true
    }
    return this.http.put(this.baseUrl + `message/${id}`, body, {
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
