import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneComponent } from './list-ligne.component';

describe('ListLigneComponent', () => {
  let component: ListLigneComponent;
  let fixture: ComponentFixture<ListLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLigneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
