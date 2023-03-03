import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup

  constructor(
    private personService: PersonsService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(1)

    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    const create = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }
    this.personService.add(create).subscribe({
      next: (result) => {
        this.router.navigateByUrl("/home-new");
      },
      error: (error) => {

      }
    });
  }

}


