import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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
  dataToBeScanned = 'Your data string';

  scanActive: boolean = false;

  constructor(
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
    console.log(roomId);
  }
}
