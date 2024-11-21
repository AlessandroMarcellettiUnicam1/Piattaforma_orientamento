import { TestBed } from '@angular/core/testing';

import { ScuoleService } from './scuole.service';

describe('ScuoleService', () => {
  let service: ScuoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScuoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
