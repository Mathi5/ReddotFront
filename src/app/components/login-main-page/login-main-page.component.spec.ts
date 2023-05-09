import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMainPageComponent } from './login-main-page.component';

describe('LoginMainPageComponent', () => {
  let component: LoginMainPageComponent;
  let fixture: ComponentFixture<LoginMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
