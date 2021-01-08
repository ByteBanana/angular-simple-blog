import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../model/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private localSt: LocalStorageService
  ) {}

  login(username: string, password: string) {
    this.http
      .post<LoginResponse>('http://localhost:8080/api/auth/login', {
        username,
        password,
      })
      .subscribe(
        (data: LoginResponse) => {
          this.localSt.store('username', data.username);
          this.localSt.store('token', data.token);
          this.toastr.success('Login success.');
        },
        (error) => {
          this.toastr.error('Login failed.');
        }
      );
  }
}
