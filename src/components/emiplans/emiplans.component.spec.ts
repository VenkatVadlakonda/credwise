import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiplansComponent } from './emiplans.component';

describe('EmiplansComponent', () => {
  let component: EmiplansComponent;
  let fixture: ComponentFixture<EmiplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmiplansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmiplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
