import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShowTaskComponent } from 'src/app/components/forms/show-task/show-task.component';
import { TaskFormComponent } from 'src/app/components/forms/task-form/task-form.component';
import { RoomsService } from 'src/app/services/rooms.service';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  showAll = false;
  modalData: any;

  username = localStorage.getItem("username");

  public tasks : any[] = [];

  public allTasks : any[] = [];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private taskService: TaskServiceService,
    private roomService: RoomsService
  ) {

    console.log(1)
  }

  ngOnInit() {
    this.showAll = false;

    this.roomService.getById(localStorage.getItem('roomId')!).subscribe({
      next: (result) => {
        console.log(result)
        this.tasks = result.tasks.slice(0,3);
        this.allTasks = result.tasks;
      },
      error:(error) => {

      }
    });
  }

  getDays(date1: any) : number {
    // To calculate the time difference of two dates
    var Difference_In_Time = new Date(date1)?.getTime() - new Date().getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Math.round(Difference_In_Days);
  }

  showAllTasks() {
    this.tasks.push(...this.allTasks);
    this.tasks = this.allTasks;
    this.showAll = true;
  }

  hideAllTasks() {
    this.tasks = this.tasks.slice(0,3);
    this.showAll = false;
  }

  addTask() {
    this.router.navigateByUrl("/tabs/add-task");
  }

  async presentModal(task: any) {
    const modal = await this.modalCtrl.create({
      component: ShowTaskComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      componentProps: {
        'actualTask': task
      }
    });

    modal.onDidDismiss().then((modalData) => {
      if (modalData !== null) {
        this.modalData = modalData.data;
        console.log('Modal Data : ' + modalData.data);
      }
    });
    await modal.present();
  }
}
