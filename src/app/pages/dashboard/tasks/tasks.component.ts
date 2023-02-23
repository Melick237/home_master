import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  public tasks = [
    {
      name: "Kitchen Cleaning",
      dueDate: new Date("2023/02/21"),
      room: 1,
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
      assignedTo: {
        firstName: "Leonardo",
        lastName: "Name",
        email: "name@test.com"
      }
    }
  ];

  constructor() { }

  ngOnInit() {}

  getDays(date1: Date) : number {
        // To calculate the time difference of two dates
        var Difference_In_Time = date1.getTime() - new Date().getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        console.log(Difference_In_Days)

    return Math.round(Difference_In_Days);
  }

}
