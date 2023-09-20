import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookbankEditComponent } from './bookbank-edit.component';

describe('BookbankEditComponent', () => {
  let component: BookbankEditComponent;
  let fixture: ComponentFixture<BookbankEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookbankEditComponent]
    });
    fixture = TestBed.createComponent(BookbankEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
