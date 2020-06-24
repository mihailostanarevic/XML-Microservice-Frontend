import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CarClassService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public createCarClass(body): Observable<any> {
    this.getToken();
    return this.http.post(this.baseUrl + 'ad/car-classes', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public updateCarClass(body, id): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `ad/car-classes/${id}/car-class`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getCarClass(id): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/car-classes/${id}/car-class`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllCarClasses(): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/car-classes`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public deleteCarClass(id): Observable<any> {
    this.getToken();
    return this.http.delete(this.baseUrl + `ad/car-classes/${id}/car-class`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getCarClassesWithFilter(filter = {}): Observable<any> {
    this.getToken();
    return this.http.get(`${this.baseUrl}ad/car-classes/with-filter${this.buildFilterRequest(filter)}`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  private buildFilterRequest(filterObject: any): String {
    const values = Object.keys(filterObject).filter(filterValue => filterValue !== null || filterValue !== '');
    if(values.length === 0) {
      return '';
    }
    let filterQuery = '?';
    let counter;
    Object.keys(filterObject).forEach(x => {
      if(filterObject[x] !== null || filterObject[x] !== '') {
        let temp = '';
        if(counter === 0) {
          temp = '';
        } else {
          temp = '&';
        }
        filterQuery = filterQuery + temp + x + '=' + filterObject[x];
        counter = counter + 1;
      }
    })
    return filterQuery;
  }

  getToken(): void {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
  }
}
