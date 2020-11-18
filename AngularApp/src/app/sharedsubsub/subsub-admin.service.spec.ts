import { TestBed } from '@angular/core/testing';

import { SubsubAdminService } from './subsub-admin.service';

describe('SubsubAdminService', () => {
  let service: SubsubAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsubAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
