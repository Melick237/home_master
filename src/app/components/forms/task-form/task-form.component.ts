import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      frequency: new FormControl(''),
      dueDate: new FormControl('', Validators.required),
      saturday: new FormControl(''),
      description: new FormControl(''),
    });
  }

  createTask() {
    console.log(this.taskForm.value)
  }

}
