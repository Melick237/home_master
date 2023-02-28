import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  profileForm!: FormGroup
  actualPerson: any;

  constructor(
    private personeService: PersonsService
  ) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.required),
      password: new FormControl(''),
    });

    this.personeService.getByEmail(localStorage.getItem('email')!).subscribe({
      next: (result) => {
        this.actualPerson = result;
        this.profileForm.patchValue(this.actualPerson);
      },
      error: (error) => {

      }
    });
  }

  save() {
    console.log(this.profileForm.value)
    const update = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
      id: this.actualPerson.id
    }
    this.personeService.add(update).subscribe({
      next: (result) => {
        this.actualPerson = result;
      },
      error: (error) => {

      }
    });
  }
}
