import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeInfoComponent } from './me-info.component';

describe('MeInfoComponent', () => {
  let component: MeInfoComponent;
  let fixture: ComponentFixture<MeInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeInfoComponent]
    });
    fixture = TestBed.createComponent(MeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
