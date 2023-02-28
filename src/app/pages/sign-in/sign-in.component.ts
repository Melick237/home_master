import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  signinForm!: FormGroup;
  showError = false;

  constructor(
    private personService: PersonsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });


  }

  signIn() {

    this.personService.getByEmail(this.signinForm.value.email)
    .subscribe({
      next: (result) => {
        console.log(result);
        if(this.signinForm.value.email === result.email &&
          this.signinForm.value.password === result.password) {
            this.authService.signIn(this.signinForm.value.email, result.id, result?.room?.id);
        } else {
          this.showError = true;
        }
      },
      error: (error) => {}
    });

  }

}
