import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MeService } from '../../services/me.service';
import { UserProfilePayload } from '../../models/user-profile.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  myProfileForm: FormGroup;
  userProfilePayload: UserProfilePayload = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  };
  constructor(private meService: MeService) {
    this.myProfileForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.meService.fetchMyProfile().subscribe((data: UserProfilePayload) => {
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
    this.meService.updateMyProfile()
  }
}
