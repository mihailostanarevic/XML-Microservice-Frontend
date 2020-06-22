import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public writeComment(body) : Observable<any>{
    return this.http.post(this.baseUrl + `comments`, body);
  }

  public approveComment(body) : Observable<any>{
    return this.http.put(this.baseUrl + `comments/approve-comment`, body);
  }

  public denyComment(body) : Observable<any>{
    return this.http.put(this.baseUrl + `comments/deny-comment`, body);
  }

  public getAllCommentsByAd(id) : Observable<any>{
    return this.http.get(this.baseUrl + `comments/${id}/ad`);
  }

  public getAllPendingComments() : Observable<any>{
    return this.http.get(this.baseUrl + `comments/pending`);
  }

}
