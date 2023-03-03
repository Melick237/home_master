import { Component, OnInit } from '@angular/core';
import { PersonsService } from 'src/app/services/persons.service';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-room-mates',
  templateUrl: './room-mates.component.html',
  styleUrls: ['./room-mates.component.scss'],
})
export class RoomMatesComponent implements OnInit {

  persons: any[] = [];

  constructor(
    private roomService: RoomsService,
    private personService: PersonsService
  ) { }

  ngOnInit() {

    this.roomService.getById(localStorage.getItem('roomId')!).subscribe({
      next: (result) => {
        console.log(result)
        this.persons = result?.persons;
      },
      error: (error) => {}
    });

  }

  removePerson(person: any) {

    const update = {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      password: person.password,
      id: person.id,
      roomId: null
    }
    this.personService.add(update).subscribe({
      next: (result) => {
        this.ngOnInit();
      },
      error: (error) => {

      }
    });

  }

}
