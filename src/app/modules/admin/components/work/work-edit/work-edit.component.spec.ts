import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEditComponent } from './work-edit.component';

describe('WorkEditComponent', () => {
  let component: WorkEditComponent;
  let fixture: ComponentFixture<WorkEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkEditComponent]
    });
    fixture = TestBed.createComponent(WorkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
