import { TestBed, inject } from '@angular/core/testing';

import { DonnorService } from './donnor.service';

describe('Donnor.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonnorService]
    });
  });

  it('should be created', inject([DonnorService], (service: DonnorService) => {
    expect(service).toBeTruthy();
  }));
});
