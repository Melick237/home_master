import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  @Input() firstSignin = false;

  constructor(
    private personService: PersonsService,
    public authService: AuthService,
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
    let roomId = 0;

    this.personService.getByEmail(this.signinForm.value.email)
    .subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem("username", result.firstName);
        if(this.signinForm.value.email === result.email &&
          this.signinForm.value.password === result.password) {
            this.personService.getById(result.id).subscribe({
              next: result => {
                roomId = result.roomId;


                if(this.firstSignin) {
                  this.authService.signIn(this.signinForm.value.email, result.id, roomId);
                  this.cancel(true);
                } else {
                  this.authService.signInRedirect(this.signinForm.value.email, result.id, roomId);
                }
              }
            });
        } else {
          this.showError = true;
        }
      },
      error: (error) => {}
    });

  }

  logout() {
    this.authService.signOut();
  }

  async cancel(reason: boolean) {
    const close: string = "Modal Removed";
    await this.modalCtrl?.dismiss(reason);
  }

}
