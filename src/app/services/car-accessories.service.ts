import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarAccessoriesService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllAccessories() : Observable<any> {
    return this.http.get(this.baseUrl + "car-accessories");
  }
}
