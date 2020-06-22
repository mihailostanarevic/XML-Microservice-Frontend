import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  
  sendMessage(body): Observable<any>{
    return this.http.post(this.baseUrl + "message", body);
  }

  getMessagesForUser(id, idSender): Observable<any>{
    console.log(idSender);
    let queryParams = {
      params: new HttpParams().set("receiver", id).set("sender", idSender)
    }
    return this.http.get(this.baseUrl + "message", queryParams);
  }

  approveDenyAccessory(body): Observable<any> {
    return this.http.put(this.baseUrl + 'message-car-accessories', body);
  }

  seen(id) : Observable<any> {
    console.log(id);
    let body = {
      seen: true
    }
    return this.http.put(this.baseUrl + `message/${id}`, body);
  }
}
