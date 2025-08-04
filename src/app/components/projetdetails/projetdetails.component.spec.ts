import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetdetailsComponent } from './projetdetails.component';

describe('ProjetdetailsComponent', () => {
  let component: ProjetdetailsComponent;
  let fixture: ComponentFixture<ProjetdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjetdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
