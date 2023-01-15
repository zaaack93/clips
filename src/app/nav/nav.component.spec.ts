import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  const mockAuthService = jasmine.createSpyObj(
    'AuthService',
    ['createUser', 'logout'],
    {
      isAuthenticated$: of(true),
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the logout link', () => {
    const lougoutLink = fixture.debugElement.query(By.css('li:nth-child(3) a'));
    expect(lougoutLink).withContext('not logged in').toBeTruthy();
  });

  it('should logout', () => {
    const lougoutLink = fixture.debugElement.query(By.css('li:nth-child(3) a'));
    //handle click by debug element
    lougoutLink.triggerEventHandler('click');

    //grab the service instance for now is for spy object
    const service = TestBed.inject(AuthService);
    //
    expect(service.logout)
      .withContext('could not click to logout link')
      .toHaveBeenCalledTimes(1);
    //expect(lougoutLink).withContext('not logged in').toBeTruthy();
  });
});
