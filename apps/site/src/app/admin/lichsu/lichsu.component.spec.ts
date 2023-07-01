/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LichsuComponent } from './lichsu.component';

describe('LichsuComponent', () => {
  let component: LichsuComponent;
  let fixture: ComponentFixture<LichsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
