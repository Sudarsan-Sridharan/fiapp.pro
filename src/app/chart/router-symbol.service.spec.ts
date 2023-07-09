import {TestBed} from '@angular/core/testing';

import {RouterSymbolService} from './router-symbol.service';

describe('RouterSymbolService', () => {
  let service: RouterSymbolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterSymbolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
