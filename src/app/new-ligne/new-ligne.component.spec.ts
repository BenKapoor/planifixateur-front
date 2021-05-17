import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLigneComponent } from './new-ligne.component';

describe('NewLigneComponent', () => {
  let component: NewLigneComponent;
  let fixture: ComponentFixture<NewLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLigneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
