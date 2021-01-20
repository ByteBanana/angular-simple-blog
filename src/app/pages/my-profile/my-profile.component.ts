import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MeService } from '../../services/me.service';
import { UserProfileResponse } from '../../models/user-profile-response.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserProfileRequest } from 'src/app/models/user-profile-request.model';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  myProfileForm: FormGroup;
  userProfile: UserProfileResponse = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  constructor(
    private meService: MeService,
    private localSt: LocalStorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.myProfileForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl(''),
      rePassword: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.meService.fetchMyProfile().subscribe((data: UserProfileResponse) => {
      console.log(data);
      this.myProfileForm.patchValue({
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log(this.myProfileForm.value);
    });
  }

  onUpdateProfile() {
    const formValues = this.myProfileForm.value;
    if (formValues.password === formValues.repassword) {
    }
    const body: UserProfileRequest = {
      email: formValues.email,
      username: this.localSt.retrieve('username'),
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
    };

    this.meService.updateMyProfile(body).subscribe(
      () => {
        this.toastr.success('Profile Updated');
      },
      (error) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }
}
