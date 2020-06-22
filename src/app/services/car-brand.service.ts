import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createCarBrand(body): Observable<any> {
    return this.http.post(this.baseUrl + 'car-brands', body);
  }

  public updateCarBrand(body, id): Observable<any> {
    return this.http.put(this.baseUrl + `car-brands/${id}/car-brand`, body);
  }

  public getCarBrand(id): Observable<any> {
    return this.http.get(this.baseUrl + `car-brands/${id}/car-brand`);
  }

  public getAllCarBrands(): Observable<any> {
    return this.http.get(this.baseUrl + `car-brands`);
  }

  public deleteCarBrand(id): Observable<any> {
    return this.http.delete(this.baseUrl + `car-brands/${id}/car-brand`);
  }

  public getCarBrandsWithFilter(filter = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}car-brands/with-filter${this.buildFilterRequest(filter)}`);
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
}
