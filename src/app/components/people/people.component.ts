import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {


  people:Person[]=[
    new Person('daniela','rique',26,70,1.72),
    new Person('luna','casas',30 ,85,1.69)
  ];
  selectedPerson: Person| null = null;
  constructor() { }

  ngOnInit(): void {
  }

  choose(person:Person){
    this.selectedPerson = person;
  }

}
