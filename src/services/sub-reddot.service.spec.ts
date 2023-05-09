import { TestBed } from '@angular/core/testing';

import { SubReddotService } from './sub-reddot.service';

describe('SubReddotService', () => {
  let service: SubReddotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubReddotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
