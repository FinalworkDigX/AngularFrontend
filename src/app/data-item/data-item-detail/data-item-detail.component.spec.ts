import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItemDetailComponent } from './data-item-detail.component';

describe('DataItemDetailComponent', () => {
  let component: DataItemDetailComponent;
  let fixture: ComponentFixture<DataItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
