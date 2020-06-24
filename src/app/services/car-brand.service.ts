import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public createCarBrand(body): Observable<any> {
    this.getToken();
    return this.http.post(this.baseUrl + 'ad/car-brands', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public updateCarBrand(body, id): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `ad/car-brands/${id}/car-brand`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getCarBrand(id): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/car-brands/${id}/car-brand`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllCarBrands(): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + `ad/car-brands`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public deleteCarBrand(id): Observable<any> {
    this.getToken();
    return this.http.delete(this.baseUrl + `ad/car-brands/${id}/car-brand`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getCarBrandsWithFilter(filter = {}): Observable<any> {
    this.getToken();
    return this.http.get(`${this.baseUrl}ad/car-brands/with-filter${this.buildFilterRequest(filter)}`, {
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
