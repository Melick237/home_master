import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeNewComponent } from './pages/home-new/home-new.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AddRoomComponent } from './components/forms/add-room/add-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './pages/dashboard/tasks/tasks.component';
import { TaskFormComponent } from './components/forms/task-form/task-form.component';
import { ShowTaskComponent } from './components/forms/show-task/show-task.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StatementComponent } from './pages/statement/statement.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RoomMatesComponent } from './pages/room-mates/room-mates.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeNewComponent,
    AddRoomComponent,
    TaskComponent,
    TasksComponent,
    TaskFormComponent,
    ShowTaskComponent,
    SettingsComponent,
    StatementComponent,
    UserProfileComponent,
    RoomMatesComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    QRCodeModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
