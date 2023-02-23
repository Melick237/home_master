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
      dueDate: new Date("25/02/2023"),
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
      dueDate: new Date("28/02/2023"),
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

}
