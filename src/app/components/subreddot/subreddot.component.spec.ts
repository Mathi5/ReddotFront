import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubreddotComponent } from './subreddot.component';

describe('SubreddotComponent', () => {
  let component: SubreddotComponent;
  let fixture: ComponentFixture<SubreddotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubreddotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubreddotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
