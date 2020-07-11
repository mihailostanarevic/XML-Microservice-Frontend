import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  private serviceBaseUrl = this.baseUrl + 'search'

  constructor(private http : HttpClient,
              private store: Store<fromApp.AppState>) { }

  lightSearch(data) : Observable<any>{
    let queryParams = {
      params : new HttpParams().set('city', data["city"]).set("from", data["from"]).set("to", data["to"])
    }
    return this.http.get(this.serviceBaseUrl + '/search/light', queryParams);
  }

  advancedSearch(data) : Observable<any> {
    let queryParams = {
      params : new HttpParams().set('city', data["city"]).set("from", data["from"]).set("to", data["to"]).set('brand', data["brand"]).set("model", data["model"]).set("fuelType", data["fuelType"]).set("gearshiftType", data["gearshiftType"])
      .set("carClass", data["carClass"]).set("priceFrom", data["priceFrom"] == null ? 0 : data["priceFrom"]).set("priceTo", data["priceTo"] == null ? 0 : data["priceTo"]).set("estimatedDistance", data["estimatedDistance"] == null ? 0 : data["estimatedDistance"])
      .set("cdw", data["cdw"]).set("childrenSeats", data["childrenSeats"] == null ? -1 : data["childrenSeats"])
    }
    return this.http.get(this.serviceBaseUrl + '/search/advanced', queryParams);
  }

  getToken(): void {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
  }
}
