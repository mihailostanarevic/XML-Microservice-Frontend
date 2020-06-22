import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarClassService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createCarClass(body): Observable<any> {
    return this.http.post(this.baseUrl + 'car-classes', body);
  }

  public updateCarClass(body, id): Observable<any> {
    return this.http.put(this.baseUrl + `car-classes/${id}/car-class`, body);
  }

  public getCarClass(id): Observable<any> {
    return this.http.get(this.baseUrl + `car-classes/${id}/car-class`);
  }

  public getAllCarClasses(): Observable<any> {
    return this.http.get(this.baseUrl + `car-classes`);
  }

  public deleteCarClass(id): Observable<any> {
    return this.http.delete(this.baseUrl + `car-classes/${id}/car-class`);
  }

  public getCarClassesWithFilter(filter = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}car-classes/with-filter${this.buildFilterRequest(filter)}`);
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
