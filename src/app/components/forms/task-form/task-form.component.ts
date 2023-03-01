import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonsService } from 'src/app/services/persons.service';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {

  @Input() actualTask: any;

  taskForm!: FormGroup;
  showError = false;
  isUpdate = false;
  persons: any[] = [];

  constructor(
    private taskService: TaskServiceService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private personeService: PersonsService
  ) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      frequency: new FormControl(''),
      dueDate: new FormControl('', Validators.required),
      onSaturday: new FormControl(''),
      description: new FormControl(''),
      personId: new FormControl(''),
    });

    if(this.isUpdate) {
      this.activatedroute.queryParams.subscribe((params) => {
        console.log(params)
        this.taskService.getById(params['taskId']).subscribe({
          next: (result) => {
            console.log(result)
            this.actualTask = result;
            this.isUpdate = true;
            this.taskForm.patchValue(result);
          },
          error: (error) => {}
        });
      });
    }

    this.personeService.getAll().subscribe({
      next: (result) => {
        console.log(result)
        this.persons = result;
      },
      error: (error) => {}
    });
  }

  createTask() {
    console.log(this.taskForm.value);
    const create = {
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      onSaturday: this.taskForm.value.onSaturday,
      frequency: this.taskForm.value.frequency,
      status: "TODO",
      roomId: localStorage.getItem("roomId"),
      personId: this.taskForm.value.personId
    }

    this.taskService.add(create).subscribe({
      next: (result) => {
        console.log(result);
        this.router.navigateByUrl("/");
      },
      error: (error) => {
        console.log(error);
        this.showError = true;
      }
    });
  }

  updateTask() {
    console.log(this.taskForm.value);
    const create = {
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      onSaturday: this.taskForm.value.onSaturday,
      frequency: this.taskForm.value.frequency,
      status: "TODO",
      roomId: localStorage.getItem("roomId"),
      id: this.actualTask.id,
      personId: this.taskForm.value.personId
    }

    this.taskService.updateTask(create).subscribe({
      next: (result) => {
        console.log(result);
        this.isUpdate = false;
        this.router.navigateByUrl("/");
      },
      error: (error) => {
        console.log(error);
        this.showError = true;
      }
    });
  }

}
