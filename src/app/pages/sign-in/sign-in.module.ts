import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SigninPageRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SigninPageRoutingModule
  ],
  declarations: [SignInComponent]
})
export class SigninPageModule {}
