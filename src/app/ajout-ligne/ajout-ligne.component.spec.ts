import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutLigneComponent } from './ajout-ligne.component';

describe('AjoutLigneComponent', () => {
  let component: AjoutLigneComponent;
  let fixture: ComponentFixture<AjoutLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutLigneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
