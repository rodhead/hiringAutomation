import { TestBed } from '@angular/core/testing';

import { TalentMgmServiceService } from './talent-mgm-service.service';

describe('TalentMgmServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalentMgmServiceService = TestBed.get(TalentMgmServiceService);
    expect(service).toBeTruthy();
  });
});
