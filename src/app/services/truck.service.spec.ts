import { TestBed, inject } from '@angular/core/testing';

import { TruckService } from './truck.service';

describe('DriversService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TruckService]
    });
  });

  it('should be created', inject([TruckService], (service: TruckService) => {
    expect(service).toBeTruthy();
  }));
});
