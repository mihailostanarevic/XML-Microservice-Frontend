import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public writeComment(body) : Observable<any>{
    this.getToken();
    return this.http.post(this.baseUrl + `comments`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public approveComment(body) : Observable<any>{
    this.getToken();
    return this.http.put(this.baseUrl + `comments/approve-comment`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public denyComment(body) : Observable<any>{
    this.getToken();
    return this.http.put(this.baseUrl + `comments/deny-comment`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllCommentsByAd(id) : Observable<any>{
    this.getToken();
    return this.http.get(this.baseUrl + `comments/${id}/ad`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllPendingComments() : Observable<any>{
    this.getToken();
    return this.http.get(this.baseUrl + `comments/pending`, {
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
