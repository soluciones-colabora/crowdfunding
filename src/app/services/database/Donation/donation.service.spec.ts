import { TestBed, inject } from '@angular/core/testing';

import { DonationService } from './donation.service';

describe('Donation.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonationService]
    });
  });

  it('should be created', inject([DonationService], (service: DonationService) => {
    expect(service).toBeTruthy();
  }));
});