import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherEventsComponent } from './other-events.component';

describe('OtherEventsComponent', () => {
  let component: OtherEventsComponent;
  let fixture: ComponentFixture<OtherEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
