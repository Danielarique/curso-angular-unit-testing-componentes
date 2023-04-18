import { Component, Host } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReversePipe } from './reverse.pipe';

fdescribe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });

  it('should transform "1234" to "4321"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('1234');
    expect(rta).toEqual('4321');
  });

  it('should be empty', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('');
    expect(rta).toEqual('');
  });
});

@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input type="text" [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}
fdescribe('test for ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should the h5 be "roma"', () => {
    const h5De = fixture.debugElement.query(By.css('h5'));
    expect(h5De.nativeElement.textContent).toEqual('roma');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    const pDe = fixture.debugElement.query(By.css('p'));

    expect(pDe.nativeElement.textContent).toEqual('');

    inputEl.value = "2 ana";
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDe.nativeElement.textContent).toEqual('ana 2')
  });
});
