import { Component, Host } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Daniela', 'rique', 26, 65, 1.75);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shound have <h3> with "hola, Daniela"', () => {
    const personElelement: HTMLElement = fixture.nativeElement;
    const h3 = personElelement.querySelector('h3');
    expect(h3?.textContent).toEqual('hola, Daniela');
  });

  it('shound have <h3> with "hola, Maria"', () => {
    component.person = new Person('Maria', 'Roa', 26, 65, 1.75);
    fixture.detectChanges();
    const expectedMsg = `hola, ${component.person.name}`;
    const personElelement: HTMLElement = fixture.nativeElement;
    const h3 = personElelement.querySelector('h3');
    expect(h3?.textContent).toEqual(expectedMsg);
  });
  it('shound have <p> with "Mi altura es: {person.heigth}"', () => {
    component.person = new Person('Maria', 'Roa', 26, 65, 1.6);
    fixture.detectChanges();
    const personElelement: HTMLElement = fixture.nativeElement;
    const p = personElelement.querySelector('p');
    expect(p?.textContent).toContain(component.person.heigth);
  });

  it('should display a text with IMC when call function calcIMC', () => {
    //Arrange
    component.person = new Person('Juan,', 'Perez', 30, 120, 1.25);
    const expectedMsg = 'overweigth level 3';
    const button = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;

    //Act
    component.calcIMC();
    fixture.detectChanges();

    //Assert
    expect(button.textContent).toContain(expectedMsg);
  });

  it('should display a text with IMC when call do click', () => {
    //Arrange
    component.person = new Person('Juan,', 'Perez', 30, 120, 1.25);
    const expectedMsg = 'overweigth level 3';
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;
    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    //Assert
    expect(buttonEl.textContent).toContain(expectedMsg);
  });

  it('should raise selected event when do click', () => {
    //Arrange
    const expectPerson = new Person('Alejandra', 'Gomez', 26, 50, 1.5);
    component.person = expectPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => {
      selectedPerson = person;
    });

    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    //Assert
    expect(selectedPerson).toEqual(expectPerson);
  });
});

@Component({
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person = new Person('Maria', 'Polo', 29, 60, 1.65);
  selectedPerson: Person | undefined;
  onSelected() {
    this.selectedPerson = this.person;
  }
}
describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixturHost: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixturHost = TestBed.createComponent(HostComponent);
    component = fixturHost.componentInstance;
    fixturHost.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    //Arrange
    const expectName = component.person.name;
    const h3De = fixturHost.debugElement.query(By.css('app-person h3'));
    const h3El = h3De.nativeElement;

    //Act
    fixturHost.detectChanges();
    //Assert

    expect(h3El.textContent).toContain(expectName);
  });

  it('should raise selected event when do click', () => {
    //Arrange
    const expectName = component.person.name;
    const btnDe = fixturHost.debugElement.query(By.css('app-person .btn-choose'));

    //Act
    btnDe.triggerEventHandler('click',null)
    fixturHost.detectChanges();
    //Assert

    expect(component.selectedPerson).toEqual(component.person);
  });
});
