import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipMenuComponent } from './membership-menu.component';

describe('MembershipMenuComponent', () => {
  let component: MembershipMenuComponent;
  let fixture: ComponentFixture<MembershipMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
