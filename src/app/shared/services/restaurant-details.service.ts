import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { environment2 } from 'src/environments/environment2';
import RestaurantDetailsDTOModel from 'src/models/restaurant-details-dto.model';

@Injectable({
  providedIn: 'root'
})

export class RestaurantDetailsService {

  constructor(private http: HttpClient) { }

  createNewRestaurantRecord(data: RestaurantDetailsDTOModel): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const records = JSON.stringify(data);
    return this.http.post(environment.apiUrl + '/restaurantDetails', records, { 'headers': headers });
  }

  retrieveAllRestaurantsRecords(): Observable<any> {
    return this.http.get(environment.apiUrl + '/restaurantDetails');
  }

  getTypeOfRestaurants(): Observable<any> {
    // return this.http.get(environment2.apiUrl + '/restaurantType');
    return this.http.get('../assets/json/mock-restaurant-types.json');
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + '/restaurantDetails/'+ id);
  }
}
