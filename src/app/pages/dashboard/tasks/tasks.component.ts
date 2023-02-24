import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  showAll = false;

  public tasks = [
    {
      name: "Kitchen Cleaning",
      dueDate: new Date("2023/02/21"),
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
      room: 1,
      status: "done",
      assignedTo: {
        firstName: "Leonardo",
        lastName: "Name",
        email: "name@test.com"
      }
    }
  ];

  constructor() {
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

}
