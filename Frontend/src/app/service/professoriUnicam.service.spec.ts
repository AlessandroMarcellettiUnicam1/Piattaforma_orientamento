import { TestBed } from '@angular/core/testing';

import { ProfessoriService } from './professori.service';
import { ProfessoriUnicamService } from './professoriUnicam.service';

describe('ProfessoriUnicamService', () => {
  let service: ProfessoriUnicamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessoriUnicamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});