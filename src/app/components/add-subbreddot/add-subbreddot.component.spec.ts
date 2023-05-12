import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubbreddotComponent } from './add-subbreddot.component';

describe('AddSubbreddotComponent', () => {
  let component: AddSubbreddotComponent;
  let fixture: ComponentFixture<AddSubbreddotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubbreddotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubbreddotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
