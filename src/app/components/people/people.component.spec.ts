import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person component', () => {
    component.people = [
      new Person('Thiago', 'Rique', 3, 10, 1),
      new Person('Nilly', 'Forero', 14, 48, 1.68),
      new Person('David', 'Sabogal', 23, 75, 1.72),
    ];

    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    expect(debugElement.length).toEqual(component.people.length);
  });

  it('should raise selected event when do selected', () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    console.log(debugElement);
    debugElement.triggerEventHandler('click', null);
    //fixture.detectChanges();

    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selectedPerson', () => {
    fixture.detectChanges();
    const buttonDe = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );

    
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(
      By.css('.selected-person ul > li')
    );
   expect(liDebug.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });
});
