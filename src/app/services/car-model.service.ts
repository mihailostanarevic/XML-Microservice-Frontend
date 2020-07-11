import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public createCarModel(body): Observable<any> {
    this.getToken();
    return this.http.post(this.baseUrl + 'ad/car-models', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public updateCarModel(body, id): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `ad/car-models/${id}/car-model`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getCarModel(id): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/car-models/${id}/car-model`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllCarModels(): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/car-models`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public deleteCarModel(id): Observable<any> {
    this.getToken();
    return this.http.delete(this.baseUrl + `ad/car-models/${id}/car-model`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getCarModelsWithFilter(filter = {}): Observable<any> {
    this.getToken();
    return this.http.get(`${this.baseUrl}ad/car-models/with-filter${this.buildFilterRequest(filter)}`, {
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

  getCarModelsByBrand(id): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/car-models/car-brand/${id}`, {
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
