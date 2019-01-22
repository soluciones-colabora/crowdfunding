import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocDetailComponent } from './assoc-detail.component';

describe('AssocDetailComponent', () => {
  let component: AssocDetailComponent;
  let fixture: ComponentFixture<AssocDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssocDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
