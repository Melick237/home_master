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
    if(localStorage.getItem("isLoggedIn") === "true") {
      return true;
    } else {
      return false;
    }
  }

  signIn(email: any, id: number, roomId: number) {
    localStorage.setItem("email", email);
    localStorage.setItem("id", id.toString());
    localStorage.setItem("roomId", roomId?.toString());
    localStorage.setItem("isLoggedIn", "true");
    this.isLoggedIn = true;
  }

  signInRedirect(email: any, id: number, roomId: number) {
    localStorage.setItem("email", email);
    localStorage.setItem("id", id.toString());
    localStorage.setItem("roomId", roomId?.toString());
    localStorage.setItem("isLoggedIn", "true");
    this.isLoggedIn = true;
    this.router.navigateByUrl("").then(() => {
      window.location.reload();
    });
  }

  signOut() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigateByUrl("");
  }

}
