import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycompanyComponent } from './mycompany.component';

describe('MycompanyComponent', () => {
  let component: MycompanyComponent;
  let fixture: ComponentFixture<MycompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycompanyComponent]
    });
    fixture = TestBed.createComponent(MycompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
