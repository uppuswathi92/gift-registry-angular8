import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInviteesComponent } from './add-invitees.component';

describe('AddInviteesComponent', () => {
  let component: AddInviteesComponent;
  let fixture: ComponentFixture<AddInviteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInviteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInviteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
