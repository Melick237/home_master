import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(
    private router: Router
  ) { }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  signIn(form: any) {
    const signIn = {
      email: form.email,
      password: form.password
    }

    localStorage.setItem("email", signIn.email);
    this.isLoggedIn = true;
  }

  signOut() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigateByUrl("");
  }

}
