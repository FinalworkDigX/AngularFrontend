import { TestBed, inject } from '@angular/core/testing';

import { DataItemService } from './data-item.service';

describe('DataItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataItemService]
    });
  });

  it('should be created', inject([DataItemService], (service: DataItemService) => {
    expect(service).toBeTruthy();
  }));
});
