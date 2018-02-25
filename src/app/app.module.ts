import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { TruckService } from './services/truck.service';
import { SearchComponent } from './search/search.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    VehiclesListComponent,
    DriverDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [TruckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
