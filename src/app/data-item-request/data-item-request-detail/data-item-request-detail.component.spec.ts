import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItemRequestDetailComponent } from './data-item-request-detail.component';

describe('DataItemRequestDetailComponent', () => {
  let component: DataItemRequestDetailComponent;
  let fixture: ComponentFixture<DataItemRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataItemRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataItemRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
