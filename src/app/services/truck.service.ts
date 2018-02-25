import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Drivers } from '../mock.drivers';
import { Vehicles } from '../mock.vehicles';
import { Driver } from '../driver';
import { Vehicle } from '../vehicle';

@Injectable()
export class TruckService {

  constructor(private http: HttpClient) { }

  // Observable<Driver[]>
  getDrivers(): Observable<Object> {
    return of(Drivers);
    // return this.http.get('http://localhost:3000/drivers');
  }
  // Observable<Vehicle[]>
  getVehicles(): Observable<Object> {
    return of(Vehicles);
    // return this.http.get('http://localhost:3000/vehicles');
  }

} // END class
