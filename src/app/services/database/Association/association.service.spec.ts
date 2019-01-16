import { TestBed, inject } from '@angular/core/testing';

import { AssociationService } from './association.service';

describe('Association.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssociationService]
    });
  });

  it('should be created', inject([AssociationService], (service: AssociationService) => {
    expect(service).toBeTruthy();
  }));
});
