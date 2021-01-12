import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { error } from 'protractor';
import { LoginResponse } from './login/login-response.payload';

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
      .post<LoginResponse>(
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
        (response: HttpResponse<LoginResponse>) => {
          const data = response.body;
          console.log(response);
          if (response.ok) {
            this.localSt.store('username', data.username);
            this.localSt.store('token', data.token);
            this.localSt.store('expiry', data.expiry);
            this.localSt.store('refreshToken', data.refreshToken);
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
        this.localSt.clear('username');
        this.localSt.clear('token');
        this.localSt.clear('expiry');
        this.localSt.clear('refreshToken');
      });
  }

  isLoggedIn(): boolean {
    const username = this.localSt.retrieve('username');
    const token = this.localSt.retrieve('token');

    return username !== null && token != null;
  }

  getToken(): string {
    return this.localSt.retrieve('token');
  }
}
