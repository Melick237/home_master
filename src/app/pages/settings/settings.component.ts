import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  dataToBeScanned = '';
  showQr = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  goToProfile() {
    this.router.navigateByUrl("/user-profile");
  }

  goToRoomate() {
    this.router.navigateByUrl("/roomates");
  }

  showQrCode() {
    this.dataToBeScanned = localStorage.getItem('roomId')!;
    this.showQr = !this.showQr;
  }

}
