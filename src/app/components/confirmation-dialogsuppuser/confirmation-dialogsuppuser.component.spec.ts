import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogsuppuserComponent } from './confirmation-dialogsuppuser.component';

describe('ConfirmationDialogsuppuserComponent', () => {
  let component: ConfirmationDialogsuppuserComponent;
  let fixture: ComponentFixture<ConfirmationDialogsuppuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogsuppuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogsuppuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
