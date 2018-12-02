import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MowerComponent } from './mower.component';

describe('MowerComponent', () => {
  let component: MowerComponent;
  let fixture: ComponentFixture<MowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
