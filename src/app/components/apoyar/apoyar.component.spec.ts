import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoyarComponent } from './apoyar.component';

describe('ApoyarComponent', () => {
  let component: ApoyarComponent;
  let fixture: ComponentFixture<ApoyarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoyarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoyarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
