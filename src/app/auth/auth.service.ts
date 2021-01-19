import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { error } from 'protractor';
import { tap } from 'rxjs/operators';
import { AuthenticationResponse } from './login/login-response.payload';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggingIn: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private localSt: LocalStorageService,
    private router: Router
  ) {}

  login(username: string, password: string) {
    this.loggingIn.emit(true);
    this.http
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/auth/login',
        {
          username,
          password,
        },
        {
          observe: 'response',
        }
      )
      .subscribe(
        (response: HttpResponse<AuthenticationResponse>) => {
          const data = response.body;
          console.log(response);
          if (response.ok) {
            this.storeAuthenticationData(data);
            this.toastr.success('Login success.');
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.toastr.error('Login failed.');
        },
        () => {}
      );
  }

  register(registerData: RegisterData) {
    this.http
      .post('http://localhost:8080/api/auth/register', registerData, {
        observe: 'response',
      })
      .subscribe(
        (response) => {
          if (response.status == 200) {
            this.toastr.success('Success', 'Registration');
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error('Registration failed.', 'Registration');
        }
      );
  }

  logout() {
    console.log('logout');
    const refreshToken = this.localSt.retrieve('refreshToken');
    const username = this.localSt.retrieve('username');
    this.http
      .post(
        'http://localhost:8080/api/auth/logout',
        {
          refreshToken: refreshToken,
          username: username,
        },
        {
          observe: 'response',
        }
      )
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/login']);
        this.clearAuthenticationData();
      });
  }

  refreshToken() {
    const refreshToken = this.localSt.retrieve('refreshToken');
    const username = this.localSt.retrieve('username');

    return this.http
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/auth/refreshToken',
        {
          refreshToken,
          username,
        },
        {
          observe: 'response',
        }
      )
      .pipe(
        tap((response) => {
          if (response.ok) {
            this.clearAuthenticationData();
            this.storeAuthenticationData(response.body);
          }
        })
      );
  }

  storeAuthenticationData(data) {
    this.localSt.store('username', data.username);
    this.localSt.store('token', data.token);
    this.localSt.store('expiry', data.expiry);
    this.localSt.store('refreshToken', data.refreshToken);
  }

  clearAuthenticationData() {
    this.localSt.clear('username');
    this.localSt.clear('token');
    this.localSt.clear('expiry');
    this.localSt.clear('refreshToken');
  }

  isLoggedIn(): boolean {
    const username = this.localSt.retrieve('username');
    const token = this.localSt.retrieve('token');
    const expiry = this.localSt.retrieve('expiry');
    const refreshToken = this.localSt.retrieve('refreshToken');

    return (
      username !== null &&
      token != null &&
      expiry != null &&
      refreshToken != null
    );
  }

  getJwtToken(): string {
    return this.localSt.retrieve('token');
  }

  getUsername(): string {
    return this.localSt.retrieve('username');
  }
}
