import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HocvanComponent } from './hocvan.component';

describe('HocvanComponent', () => {
  let component: HocvanComponent;
  let fixture: ComponentFixture<HocvanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HocvanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HocvanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
