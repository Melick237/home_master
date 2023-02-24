import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShowTaskComponent } from 'src/app/components/forms/show-task/show-task.component';
import { TaskFormComponent } from 'src/app/components/forms/task-form/task-form.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  showAll = false;
  modalData: any;

  public tasks = [
    {
      name: "Kitchen Cleaning",
      dueDate: new Date("2023/02/21"),
      description: "some description",
      frequency: "daily",
      saturday: true,
      room: 1,
      status: "todo",
      assignedTo: {
        firstName: "Leonardo",
        lastName: "Name",
        email: "name@test.com"
      }
    },
    {
      name: "Vacum Cleaning",
      dueDate: new Date(),
      description: "some description",
      frequency: "monthly",
      saturday: false,
      room: 1,
      status: "doing",
      assignedTo: {
        firstName: "Peter",
        lastName: "Jack",
        email: "name@test.com"
      }
    },
    {
      name: "Bathroom Cleaning",
      dueDate: new Date("2023/02/26"),
      description: "some description",
      frequency: "weekly",
      saturday: true,
      room: 1,
      status: "done",
      assignedTo: {
        firstName: "Leonardo",
        lastName: "Name",
        email: "name@test.com"
      }
    }
  ];

  public allTasks = [
    {
      name: "Bathroom Cleaning",
      dueDate: new Date("2023/02/19"),
      description: "some description",
      frequency: "daily",
      saturday: false,
      room: 1,
      status: "todo",
      assignedTo: {
        firstName: "Leonardo",
        lastName: "Name",
        email: "name@test.com"
      }
    },
    {
      name: "Bathroom Cleaning",
      dueDate: new Date("2023/02/22"),
      description: "some description",
      frequency: "monthly",
      saturday: true,
      room: 1,
      status: "doing",
      assignedTo: {
        firstName: "Leonardo",
        lastName: "Name",
        email: "name@test.com"
      }
    },
    {
      name: "Bathroom Cleaning",
      dueDate: new Date("2023/02/25"),
      description: "some description",
      frequency: "weekly",
      saturday: false,
      room: 1,
      status: "done",
      assignedTo: {
        firstName: "Leonardo",
        lastName: "Name",
        email: "name@test.com"
      }
    }
  ];

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.showAll = false;
  }

  getDays(date1: Date) : number {
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - new Date().getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Math.round(Difference_In_Days);
  }

  showAllTasks() {
    this.tasks.push(...this.allTasks);
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
