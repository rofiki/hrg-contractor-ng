import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookbankAddComponent } from './bookbank-add.component';

describe('BookbankAddComponent', () => {
  let component: BookbankAddComponent;
  let fixture: ComponentFixture<BookbankAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookbankAddComponent]
    });
    fixture = TestBed.createComponent(BookbankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
