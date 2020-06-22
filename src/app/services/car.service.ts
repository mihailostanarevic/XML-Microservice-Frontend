import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getCarAccessories(id) : Observable<any>{
    return this.http.get(this.baseUrl + `cars/${id}/car-accessories`);
  }
}
