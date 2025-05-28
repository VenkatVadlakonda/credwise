import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTypesComponent } from './loantype.component';

describe('LoantypeComponent', () => {
  let component: LoanTypesComponent;
  let fixture: ComponentFixture<LoanTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
