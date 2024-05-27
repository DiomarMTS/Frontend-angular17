import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store user data', () => {
    const mockResponse = {
      message: 'Login successful',
      result: true,
      data: { token: 'dummyToken', rol: 'usuario', nombre: 'Juan Pérez' }
    };

    spyOn(router, 'navigateByUrl');

    service.login('test@example.com', 'password');

    const req = httpMock.expectOne('http://localhost:8080/usuarios/iniciarSesion');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(service.getUser()).toEqual(mockResponse.data);
    expect(localStorage.getItem('token')).toBe('dummyToken');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.data));

    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should logout and clear user data', () => {
    // Set up initial state
    localStorage.setItem('token', 'dummyToken');
    localStorage.setItem('user', JSON.stringify({ token: 'dummyToken', rol: 'usuario', nombre: 'Juan Pérez' }));
    service.logout();

    expect(service.getUser()).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
