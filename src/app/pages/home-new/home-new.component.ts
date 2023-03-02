import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PersonsService } from 'src/app/services/persons.service';
import { SignInComponent } from '../sign-in/sign-in.component';

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
  modalData: any;

  scanActive: boolean = false;

  constructor(
    private personeService: PersonsService,
    private router: Router,
    private authService: AuthService,
    private modalCtrl: ModalController
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

  async signUpToRoom(roomId: string) {

    if (this.authService.isAuthenticated()){
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
    } else {
      // if the user is not authenticated
      const modal = await this.modalCtrl.create({
        component: SignInComponent,
        breakpoints: [0, 0.3, 0.5, 0.8],
        initialBreakpoint: 0.5,
        componentProps: {
          'firstSignin': true
        }
      });

      modal.onDidDismiss().then((modalData) => {
        if (modalData !== null) {
          this.modalData = modalData.data;
          console.log('Modal Data : ' + modalData.data);

          if(modalData.data) {
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
                    this.router.navigateByUrl("/welcome1");
                  }
                });
              },
              error: (error) => {
                console.log(error);
              }
            });
          }
        }
      });
      await modal.present();



    }

  }
}
