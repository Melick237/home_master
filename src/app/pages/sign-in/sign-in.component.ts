import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PersonsService } from 'src/app/services/persons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  signinForm!: FormGroup;
  showError = false;

  @Input() firstSignin = false;

  constructor(
    private personService: PersonsService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });


  }
  signUp() {
    this.router.navigateByUrl("/signUp");
  }

  signIn() {

    this.personService.getByEmail(this.signinForm.value.email)
    .subscribe({
      next: (result) => {
        console.log(result);
        if(this.signinForm.value.email === result.email &&
          this.signinForm.value.password === result.password) {
            if(this.firstSignin) {
              this.authService.signIn(this.signinForm.value.email, result.id, result?.room?.id);
              this.cancel(true);
            } else {
              this.authService.signInRedirect(this.signinForm.value.email, result.id, result?.room?.id);
            }
        } else {
          this.showError = true;
        }
      },
      error: (error) => {}
    });

  }

  async cancel(reason: boolean) {
    const close: string = "Modal Removed";
    await this.modalCtrl?.dismiss(reason);
  }

}
