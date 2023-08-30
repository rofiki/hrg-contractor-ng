import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookbankComponent } from './bookbank.component';

describe('BookbankComponent', () => {
  let component: BookbankComponent;
  let fixture: ComponentFixture<BookbankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookbankComponent]
    });
    fixture = TestBed.createComponent(BookbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
