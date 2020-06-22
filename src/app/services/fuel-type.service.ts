import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuelTypeService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createFuelType(body): Observable<any> {
    return this.http.post(this.baseUrl + 'fuel-types', body);
  }

  public updateFuelType(body, id): Observable<any> {
    return this.http.put(this.baseUrl + `fuel-types/${id}/fuel-type`, body);
  }

  public getFuelType(id): Observable<any> {
    return this.http.get(this.baseUrl + `fuel-types/${id}/fuel-type`);
  }

  public getAllFuelTypes(): Observable<any> {
    return this.http.get(this.baseUrl + `fuel-types`);
  }

  public deleteFuelType(id): Observable<any> {
    return this.http.delete(this.baseUrl + `fuel-types/${id}/fuel-type`);
  }

  public getFuelTypessWithFilter(filter = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}fuel-types/with-filter${this.buildFilterRequest(filter)}`);
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
