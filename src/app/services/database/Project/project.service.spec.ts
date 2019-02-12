import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';

describe('Project.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
