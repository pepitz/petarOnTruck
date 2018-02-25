import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';

import { TruckService } from '../services/truck.service';
import { Driver } from '../driver';

import { VehiclesListComponent } from '../vehicles-list/vehicles-list.component';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent extends VehiclesListComponent implements OnInit, OnChanges {

  @Input() driver: string;
  truckService: TruckService;
  totalFullTrailer: number;
  totalSemiTrailer: number;
  totalRigid: number;
  totalBoxVan: number;
  totalVan: number;
  sumOfAllTrucks: number;

  numOftrucks = 1;


  constructor(truckService: TruckService) {
    super(truckService);
  }

  ngOnInit() {
    this.loadVehicles();
    this.processVehicleByType(this.arrVehicles);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {

    if (changes.driver && changes.driver.currentValue) {

      // console.log('input driver vehicles: ', this.driver['vehicles']);
      // console.log('List of Full trucks:', this.arrFullTrailer[0]['ids']);
      this.totalFullTrailer = this.totalTrucksByCategory(this.arrFullTrailer);
      this.totalSemiTrailer = this.totalTrucksByCategory(this.arrSemiTrailer);
      this.totalRigid = this.totalTrucksByCategory(this.arrRigidTruck);
      this.totalBoxVan = this.totalTrucksByCategory(this.arrBoxVan);
      this.totalVan = this.totalTrucksByCategory(this.arrVan);
      this.sumOfAllTrucks = this.totalFullTrailer + this.totalSemiTrailer + this.totalRigid + this.totalBoxVan + this.totalVan;


    }

  } // END ngOnChanges()

  totalTrucksByCategory( arr: any[] ): number {

    let total_trucks_by_cat: number;
    let isIdIncluded = false;
    const arr_results = [];

    this.driver['vehicles'].forEach(item => {

      isIdIncluded = arr[0]['ids'].includes(item);
      if (isIdIncluded === true) {
        arr_results.push(item);
      }

      total_trucks_by_cat = arr_results.length;

    });

    // console.log('arr_results: ', total_trucks_by_cat);
    return total_trucks_by_cat;

  }

} // END class
