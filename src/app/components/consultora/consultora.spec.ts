import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consultora } from './consultora';

describe('Consultora', () => {
  let component: Consultora;
  let fixture: ComponentFixture<Consultora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consultora],
    }).compileComponents();

    fixture = TestBed.createComponent(Consultora);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
