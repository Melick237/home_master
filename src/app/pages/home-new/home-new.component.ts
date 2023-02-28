import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.scss'],
})
export class HomeNewComponent implements OnInit, OnDestroy {

  scanSub: any;
  qrContent: string = '';
  scannedResult : any;
  content_visibility = '';
  permission  : any;

  scanActive: boolean = false;

  constructor(
    private personeService: PersonsService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.checkPermission();
  }



  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      this.permission = permission;
      console.log(this.permission);

      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.scanActive = false;
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        this.signUpToRoom(this.scannedResult);
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = '';
    this.scanActive = false;
  }

  ngOnDestroy(): void {
      this.stopScan();
  }

  signUpToRoom(roomId: string) {




    this.personeService.getByEmail(localStorage.getItem('email')!).subscribe({
      next: (result) => {
        console.log(result);
        const update = {
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          password: result.password,
          id: result.id,
          roomId: roomId
        }
        this.personeService.add(update).subscribe({
          next: (result) => {
            this.router.navigateByUrl("");
          },
          error: (error) => {

          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
