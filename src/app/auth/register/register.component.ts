import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from 'src/app/util/form.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });

    this.usernameCtrl().valueChanges.subscribe((values: string) => {
      if (this.usernameCtrl().valid) {
      }
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
    } else {
      this.formService.validateAllFormFields(this.registerForm);
    }
  }

  usernameCtrl(): AbstractControl {
    return this.registerForm.get('username');
  }

  emailCtrl(): AbstractControl {
    return this.registerForm.get('email');
  }

  passwordCtrl(): AbstractControl {
    return this.registerForm.get('password');
  }

  firstNameCtrl(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  lastNameCtrl(): AbstractControl {
    return this.registerForm.get('lastName');
  }
}
