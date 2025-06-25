import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodotableComponent } from './todotable.component';

describe('TodotableComponent', () => {
  let component: TodotableComponent;
  let fixture: ComponentFixture<TodotableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodotableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
