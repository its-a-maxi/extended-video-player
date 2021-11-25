import { TestBed } from '@angular/core/testing';

import { CurrentVideoService } from './current-video.service';

describe('CurrentVideoService', () => {
  let service: CurrentVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
