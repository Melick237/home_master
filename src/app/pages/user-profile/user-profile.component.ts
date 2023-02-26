import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  profileForm!: FormGroup

  constructor() { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.required),
      password: new FormControl(''),
    });
  }

  save() {
    console.log(this.profileForm.value)
  }
}
