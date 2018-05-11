import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItemRequestComponent } from './data-item-request.component';

describe('DataItemRequestComponent', () => {
  let component: DataItemRequestComponent;
  let fixture: ComponentFixture<DataItemRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataItemRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataItemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
