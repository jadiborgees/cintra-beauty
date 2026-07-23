import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoComprar } from './como-comprar';

describe('ComoComprar', () => {
  let component: ComoComprar;
  let fixture: ComponentFixture<ComoComprar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoComprar],
    }).compileComponents();

    fixture = TestBed.createComponent(ComoComprar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
