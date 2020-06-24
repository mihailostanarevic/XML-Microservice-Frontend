import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class GearshiftTypeService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public createGearshiftType(body): Observable<any> {
    this.getToken();
    return this.http.post(this.baseUrl + 'ad/gearshift-types', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public updateGearshiftType(body, id): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `ad/gearshift-types/${id}/gearshift-type`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getGearshiftType(id): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/gearshift-types/${id}/gearshift-type`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllGearshiftTypes(): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/gearshift-types`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public deleteGearshiftType(id): Observable<any> {
    this.getToken();
    return this.http.delete(this.baseUrl + `ad/gearshift-types/${id}/gearshift-type`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getGearshiftTypessWithFilter(filter = {}): Observable<any> {
    this.getToken();
    return this.http.get(`${this.baseUrl}ad/gearshift-types/with-filter${this.buildFilterRequest(filter)}`, {
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
