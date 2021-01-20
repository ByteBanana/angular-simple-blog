import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usernameError: boolean = false;
  passwordError: boolean = false;
  isLoggingIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.usernameControl().valueChanges.subscribe((values) => {
      if (this.usernameControl().valid) {
        this.usernameError = false;
      }
    });

    this.passwordControl().valueChanges.subscribe((values) => {
      if (this.passwordControl().valid) {
        this.passwordError = false;
      }
    });
  }

  onLogin() {
    const isTouchedAndDirty = this.loginForm.dirty || this.loginForm.touched;
    this.usernameError = false;
    this.passwordError = false;
    this.authService.clearAuthenticationData();
    if (this.loginForm.touched && isTouchedAndDirty) {
      if (this.loginForm.invalid) {
        if (this.usernameControl().errors) {
          this.usernameError = true;
        }
        if (this.passwordControl().errors) {
          console.log(this.passwordControl().errors);
          this.passwordError = true;
        }
      } else {
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        this.authService.login(username, password);
      }
    }
  }

  usernameControl(): AbstractControl {
    return this.loginForm.get('username');
  }

  passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }
}
