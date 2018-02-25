// tslint:disable:prefer-const
// tslint:disable:indent
// tslint:disable:no-trailing-whitespace
// tslint:disable:eofline
// tslint:disable:max-line-length

import { Component, OnInit } from '@angular/core';
import { TruckService } from '../services/truck.service';
import { Driver } from '../driver';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  isActive = false;
  isAllVisible = true;
  isFullVisible = true;
  isSemiVisible = true;
  isRigidVisible = true;
  isBoxVisible = true;
  isVanVisible = true;
  vehicles: any[] = [{}, {}, {}, {}, {}];
  // Driver[]
  arrDrivers: any = [];
  // Vehicle[]
  arrVehicles: any = [];
  arrFullTrailer = [{ ids: [], drivers: [] }];
  arrSemiTrailer = [{ ids: [], drivers: [] }];
  arrRigidTruck = [{ ids: [], drivers: [] }];
  arrBoxVan = [{ ids: [], drivers: [] }];
  arrVan = [{ ids: [], drivers: [] }];

  constructor(protected truckService: TruckService) { }

  ngOnInit() {

    this.loadVehicles();
    this.loadDrivers();
    this.processVehicleByType(this.arrVehicles);
    this.listDriversByVehicle();


    // console.log('Arr_RigidTruck names: ', this.arrRigidTruck[0]['drivers']);
    // console.log('Arr_drivers_emails: ', this.arrFullTrailer[0]['emails']);
    // console.log('arr_Full_Trailer', this.arrFullTrailer);
    // console.log('arrVehicles', this.arrVehicles);
    // console.log('arrDrivers: ', this.arrDrivers);

  }

  sortByTruck(type): void {

    this.isActive = true;

    switch (type) {

      case 'all':
        this.isAllVisible = true;
        this.isFullVisible = true;
        this.isSemiVisible = true;
        this.isRigidVisible = true;
        this.isBoxVisible = true;
        this.isVanVisible = true;
        break;

      case 'full':
        this.isAllVisible = false;
        this.isFullVisible = true;
        this.isSemiVisible = false;
        this.isRigidVisible = false;
        this.isBoxVisible = false;
        this.isVanVisible = false;
        break;

      case 'semi':
        this.isAllVisible = false;
        this.isFullVisible = false;
        this.isSemiVisible = true;
        this.isRigidVisible = false;
        this.isBoxVisible = false;
        this.isVanVisible = false;
        break;

      case 'rigid':
        this.isAllVisible = false;
        this.isFullVisible = false;
        this.isSemiVisible = false;
        this.isRigidVisible = true;
        this.isBoxVisible = false;
        this.isVanVisible = false;
        break;

      case 'box':
        this.isAllVisible = false;
        this.isFullVisible = false;
        this.isSemiVisible = false;
        this.isRigidVisible = false;
        this.isBoxVisible = true;
        this.isVanVisible = false;
        break;

      case 'van':
        this.isAllVisible = false;
        this.isFullVisible = false;
        this.isSemiVisible = false;
        this.isRigidVisible = false;
        this.isBoxVisible = false;
        this.isVanVisible = true;
        break;

      default:
        break;
    }
  }

  listDriversByVehicle(): void {

    this.processDriversByVehicle(this.arrFullTrailer);
    this.processDriversByVehicle(this.arrSemiTrailer);
    this.processDriversByVehicle(this.arrRigidTruck);
    this.processDriversByVehicle(this.arrBoxVan);
    this.processDriversByVehicle(this.arrVan);

  }

  loadDrivers(): void {

    this.truckService.getDrivers().subscribe(
      data => { 
        console.log('Data from drivers: ', data);
        this.arrDrivers = data; 
      },
      error => {
        console.log('http error drivers', error);
      });

  }

  loadVehicles(): void {

    this.truckService.getVehicles().subscribe(
      data => { 
        this.arrVehicles = data; 
      },
      error => {
        console.log('http error vehicles', error);
      });
    console.log('Vehicles after the call: ', this.arrVehicles);

  }

  processVehicleByType(all_vehicles: any): void {

    for (let i = 0; i < all_vehicles.length; i++) {

      if (all_vehicles[i]['type'] === 'full_trailer') {

        this.arrFullTrailer[0]['ids'].push(all_vehicles[i]['id']);

      } else if (all_vehicles[i]['type'] === 'semi_trailer') {

        this.arrSemiTrailer[0]['ids'].push(all_vehicles[i]['id']);

      } else if (all_vehicles[i]['type'] === 'rigid_truck') {

        this.arrRigidTruck[0]['ids'].push(all_vehicles[i]['id']);

      } else if (all_vehicles[i]['type'] === 'box_van') {

        this.arrBoxVan[0]['ids'].push(all_vehicles[i]['id']);

      } else if (all_vehicles[i]['type'] === 'van') {

        this.arrVan[0]['ids'].push(all_vehicles[i]['id']);

      }

    }

  }

  onlyUnique(value, index, self) {
    let ind = self.findIndex(i => value.name === i.name);
    return ind === index;
  }

  processDriversByVehicle(arr_type_vehicle: any[]): void {

    let arr_id_vehicle = arr_type_vehicle[0]['ids'],
      arr_drivers = arr_type_vehicle[0]['drivers'];

    for (let i = 0; i < arr_id_vehicle.length; i++) {

      for (let d = 0; d < this.arrDrivers.length; d++) {

        if (this.arrDrivers[d]['vehicles'].includes(arr_id_vehicle[i])) {

          let driver_n = this.arrDrivers[d]['name'];
          let driver_e = this.arrDrivers[d]['email'];
          let driver_to_add = { name: driver_n, email: driver_e };
          // add names only once

          arr_type_vehicle[0]['drivers'].push(driver_to_add);

          let unique_arr = arr_type_vehicle[0]['drivers'].filter(this.onlyUnique);
          arr_type_vehicle[0]['drivers'] = unique_arr;

        }

      }

    }




  }

} // END class
