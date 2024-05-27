import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is authenticated', () => {
    spyOn(authService, 'getUser').and.returnValue({ name: 'Test User' }); // Mock the getUser method to return a user object
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(true);
  });

  it('should block access and redirect to login when user is not authenticated', () => {
    spyOn(authService, 'getUser').and.returnValue(null); // Mock the getUser method to return null
    spyOn(router, 'navigate').and.stub(); // Mock the navigate method

    const canActivate = guard.canActivate();
    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Verify that the router.navigate method was called with the login route
  });
});
