/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListthietbiComponent } from './listthietbi.component';

describe('ListthietbiComponent', () => {
  let component: ListthietbiComponent;
  let fixture: ComponentFixture<ListthietbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListthietbiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListthietbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
