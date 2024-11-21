import { TestBed } from '@angular/core/testing';

import { ResattService } from './resatt.service';

describe('ResattService', () => {
  let service: ResattService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResattService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
