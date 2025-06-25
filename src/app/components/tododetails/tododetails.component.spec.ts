import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TododetailsComponent } from './tododetails.component';

describe('TododetailsComponent', () => {
  let component: TododetailsComponent;
  let fixture: ComponentFixture<TododetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TododetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TododetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
