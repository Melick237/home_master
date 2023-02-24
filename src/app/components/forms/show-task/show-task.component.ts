import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss'],
})
export class ShowTaskComponent implements OnInit {

  @Input() actualTask!: any;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private alertController: AlertController,
    private taskService: TaskServiceService
    ) { }

  ngOnInit() {}

  async cancel() {
    const close: string = "Modal Removed";
    await this.modalCtrl?.dismiss(close);
  }

  confirm() {
    this.router.navigateByUrl("/tabs/add-task");
    this.modalCtrl?.dismiss(null, 'cancel');
  }

  async remind(actualTask: any) {
    const alert = await this.alertController.create({
      header: 'Do you really want to send the reminder for the task '+actualTask.name+' ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.taskService.sendReminder();
          },
        },
      ],
    });

    await alert.present();
  }

  async inProgress(actualTask :any) {
    const alert = await this.alertController.create({
      header: 'Do you really want to change the status of the task '+actualTask.name+' ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.taskService.updateTask();
          },
        },
      ],
    });

    await alert.present();
  }

  async done(actualTask :any) {
    const alert = await this.alertController.create({
      header: 'Have you really already done the task of '+actualTask.name+' ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.taskService.sendReminder();
          },
        },
      ],
    });

    await alert.present();
  }

  getDays(date1: Date) : number {
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - new Date().getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Math.round(Difference_In_Days);
  }

  getBackgroungColor(dueDate: number, status: string): string {

    if (dueDate < 0) {
      return '#F1B6B6';
    }
    if (dueDate >= 0 && status === 'doing') {
      return '#0D6EFD';
    }
    if (dueDate >= 0 && status === 'done') {
      return '#00FF29';
    }
    return 'white'
  }
}
