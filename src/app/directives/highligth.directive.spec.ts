import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 highligth class="title">default</h5>
    <h5 highligth="yellow">yellow</h5>
    <p highligth="blue">parrafo</p>
    <p>otro parrafo</p>
    <input type="text" [(ngModel)]="color" [highligth]="color" />
  `,
})
class HostComponent {
  color = 'pink';
}
describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighligthDirective],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highligth elements', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    const elementsWithout = fixture.debugElement.queryAll(
      By.css('*:not([highligth])')
    );

    expect(elements.length).toEqual(4);
    expect(elementsWithout.length).toEqual(2);
  });

  it('should the elements be match with bgcolor', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be defaultColor', () => {
    const tittleDe = fixture.debugElement.query(By.css('.title'));

    const dir = tittleDe.injector.get(HighligthDirective);

    expect(tittleDe.nativeElement.style.backgroundColor).toEqual(
      dir.defaultColor
    );
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl : HTMLInputElement = inputDe.nativeElement;

    expect(inputEl.style.backgroundColor).toEqual(component.color);

    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');

  });
});
