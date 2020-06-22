import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GearshiftTypeService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createGearshiftType(body): Observable<any> {
    return this.http.post(this.baseUrl + 'gearshift-types', body);
  }

  public updateGearshiftType(body, id): Observable<any> {
    return this.http.put(this.baseUrl + `gearshift-types/${id}/gearshift-type`, body);
  }

  public getGearshiftType(id): Observable<any> {
    return this.http.get(this.baseUrl + `gearshift-types/${id}/gearshift-type`);
  }

  public getAllGearshiftTypes(): Observable<any> {
    return this.http.get(this.baseUrl + `gearshift-types`);
  }

  public deleteGearshiftType(id): Observable<any> {
    return this.http.delete(this.baseUrl + `gearshift-types/${id}/gearshift-type`);
  }

  public getGearshiftTypessWithFilter(filter = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}gearshift-types/with-filter${this.buildFilterRequest(filter)}`);
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
