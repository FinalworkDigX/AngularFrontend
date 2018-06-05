import { TestBed, inject } from '@angular/core/testing';

import { DataItemRequestService } from './data-item-request.service';

describe('DataItemRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataItemRequestService]
    });
  });

  it('should be created', inject([DataItemRequestService], (service: DataItemRequestService) => {
    expect(service).toBeTruthy();
  }));
});
