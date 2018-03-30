import { TestBed, inject } from '@angular/core/testing';

import { CityEventService } from './city-event.service';

describe('CityEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityEventService]
    });
  });

  it('should be created', inject([CityEventService], (service: CityEventService) => {
    expect(service).toBeTruthy();
  }));
});
