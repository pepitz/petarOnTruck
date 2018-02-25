// tslint:disable:prefer-const
// tslint:disable:indent
// tslint:disable:no-trailing-whitespace
// tslint:disable:eofline
// tslint:disable:max-line-length

import { Component, OnInit, ElementRef } from '@angular/core';

import { TruckService } from '../services/truck.service';
import { Driver } from '../driver';
import { VehiclesListComponent } from '../vehicles-list/vehicles-list.component';

@Component({
  selector: 'app-search',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends VehiclesListComponent implements OnInit {

  selectedDriver: Driver;
  query = '';
  // Driver[]
  arrDriverData: any = [];
  arrDriverNameEmail: string[] = [];
  truckService: TruckService;
  filteredList = [];
  public elementRef;

  constructor(myElement: ElementRef, truckService: TruckService) {
    super(truckService);
    this.elementRef = myElement;
  }

  ngOnInit() {

    this.getDriverData();
    this.extractDriverData();
    // console.log('Search component gets: arrDriverNames > ', this.arrDriverNameEmail);

  }


  filter() {
    if (this.query !== '') {
      this.filteredList = this.arrDriverNameEmail.filter(function (el) {
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    } else {
      this.filteredList = [];
    }
  }

  select(item) {
    this.query = item;
    this.onSelect(item);
    this.filteredList = [];
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }


  onSelect(drvr): void {

    let result;
    let arr_Unique_driverIds = [];
    for (let i = 0; i < this.arrDriverData.length; i++) {
      if (this.arrDriverData[i]['name'] === drvr || this.arrDriverData[i]['email'] === drvr) {
        this.selectedDriver = this.arrDriverData[i];
      }
    } // END selectedDriver

  } // END onSelect()

  getDriverData(): void {
    this.truckService.getDrivers().subscribe(data => this.arrDriverData = data);
  }

  extractDriverData(): void {
    for (let i = 0; i < this.arrDriverData.length; i++) {
      this.arrDriverNameEmail.push(this.arrDriverData[i]['name']);
      this.arrDriverNameEmail.push(this.arrDriverData[i]['email']);
    }
  }


} // END class
