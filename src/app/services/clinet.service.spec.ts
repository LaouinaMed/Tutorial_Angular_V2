import { TestBed } from '@angular/core/testing';

import { ClinetService } from './clinet.service';

describe('ClinetService', () => {
  let service: ClinetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
