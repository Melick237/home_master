import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RoomsService } from 'src/app/services/rooms.service';
import { PersonsService } from 'src/app/services/persons.service';
import { Router } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Camera } = Plugins;

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit {

  @ViewChild(IonContent, { static: true }) ionContent!: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides!: IonSlides;
  @ViewChild('billingFormRef', { static: false }) billingFormRef!: NgForm;
  @ViewChild('shippingFormRef', { static: false }) shippingFormRef!: NgForm;
  @ViewChild('paymentFormRef', { static: false }) paymentFormRef!: NgForm;

  public order: any = {
    id: 1,
    items: [{
      id: 1,
      name: 'Denim T-Shirt',
      amount: 15.00,
    }, {
      id: 1,
      name: 'Denim Pants',
      amount: 5.00,
    }, {
      id: 1,
      name: 'Black T-Shirt',
      amount: 5.00,
    }],
    subtotal: 25.00,
    shippingFee: 5.00,
    total: 30.00
  };

  public profileForm!: FormGroup;
  public housePictureForm!: FormGroup;
  public nameForm!: FormGroup;
  public houseType!: FormGroup;
  public houseName!: FormGroup;

  public profileImagePath!: SafeResourceUrl;
  public houseImagePath!: SafeResourceUrl;

  public times! : string[];

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  public slides!: string[];
  public currentSlide!: string;
  public isBeginning = true;
  public isEnd = false;
  base64= '';

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private roomService: RoomsService,
    private personService: PersonsService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.setupForm();
    this.buildSlides();
  }

  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
  }

  buildSlides() {
    const slides = ['Profile Picture', 'Household Picture', 'Name', 'Household Type', 'Household Name'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  setupForm() {
    this.profileForm = new FormGroup({
      profileImg: new FormControl('')
    });

    this.housePictureForm = new FormGroup({
      housePicture: new FormControl('')
    });

    this.nameForm = new FormGroup({
      personName: new FormControl('')
    });

    this.houseType = new FormGroup({
      type: new FormControl('')
    });

    this.houseName = new FormGroup({
      houseName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  onNextButtonTouched() {

    if (this.currentSlide === 'Profile Picture') {


      if (this.profileForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Household Picture') {


      if (this.housePictureForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Name') {


      if (this.nameForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Household Type') {


      if (this.houseType.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Household Name') {


      if (this.houseName.valid) {
        this.navCtrl.navigateRoot('/thanks', {
          animated: true,
          animationDirection: 'forward',
        });
      }

    }  else {

      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  async chooseImage(source: CameraSource, field: string) {

    try {

      const image = await Camera['getPhoto']({
        quality: 70,
        width: 600,
        height: 600,
        preserveAspectRatio: true,
        allowEditing: true,
        correctOrientation: true,
        source: source,
        resultType: CameraResultType.Uri,
      });

      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);

      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.base64 = await this.convertBlobToBase64(blob) as string;

      // Send encoded string to server...
      if(field === 'profileImagePath') {
        this.profileImagePath = safeUrl;
        this.profileForm.get('profileImg')?.setValue(this.base64);
      }
      if(field === 'houseImagePath') {
        this.houseImagePath = safeUrl;
        this.housePictureForm.get('housePicture')?.setValue(this.base64);
      }

    } catch (error) {
      console.warn(error);
    }

  }

  async presentActionSheet(fieldType: string) {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose an option',
      buttons: [{
        text: 'Photo Library',
        handler: () => {
          this.chooseImage(CameraSource.Photos, fieldType);
        }
      }, {
        text: 'Camera',
        handler: () => {
          this.chooseImage(CameraSource.Camera, fieldType);
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });

    return await actionSheet.present();
  }

  originalOrder = (): number => 0;

  create() {
    console.log( this.nameForm.value, this.housePictureForm.value, this.profileForm.value, this.houseType.value, this.houseName.value );

    this.personService.getByEmail(this.houseName.value.email).subscribe({
      next: (person) => {

        const create = {
          name: this.houseName.value.houseName
        }
        this.roomService.add(create).subscribe({
          next: (room) => {

            const update = {
              firstName: person.firstName,
              lastName: person.lastName,
              email: person.email,
              password: person.password,
              id: person.id,
              roomId: room.id
            }
            this.personService.add(update).subscribe({
              next: (result) => {
                this.router.navigateByUrl("/home-new");
              },
              error: (error) => {

              }
            });
          },
          error: (error) => {

          }
        });
      },
      error: (error) => {

      }
    });


  }
}
