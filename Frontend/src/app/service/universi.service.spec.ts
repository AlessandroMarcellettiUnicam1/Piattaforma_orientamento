import { TestBed } from '@angular/core/testing';

import { UniversiService } from './universi.service';

describe('UniversiService', () => {
  let service: UniversiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
