import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAssocComponent } from './register-assoc.component';

describe('RegisterAssocComponent', () => {
  let component: RegisterAssocComponent;
  let fixture: ComponentFixture<RegisterAssocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAssocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAssocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
