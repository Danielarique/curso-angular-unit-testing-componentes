import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';
import { generateManyProducts } from '../../models/product.mock';
import { ProductsService } from '../../services/product.service';
import { ValueService } from '../../services/value.service';
import { ProductComponent } from '../product/product.component';

import { ProductsComponent } from './products.component';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [
      'getPromiseValue',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductsService, useValue: spy },
        { provide: ValueService, useValue: valueServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;

    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', () => {
      const productsMock = generateManyProducts(10);
      const countPrev = component.products.length;
      productService.getAll.and.returnValue(of(productsMock));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.products.length).toEqual(
        productsMock.length + countPrev
      );
    });

    it('should change the status "loading" => "success', fakeAsync(() => {
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        defer(() => Promise.resolve(productMock))
      );

      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');

      tick();
      fixture.detectChanges();

      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" => "error', fakeAsync(() => {
      productService.getAll.and.returnValue(
        defer(() => Promise.reject('error'))
      );

 /*      const btnDe = fixture.debugElement.query(By.css('.btn-promise'));
      btnDe.triggerEventHandler('click',null); */
      const btnMoreDe = fixture.debugElement.query(By.css('.btn-more'));
      btnMoreDe.triggerEventHandler('click',null);
     
     //component.getAllProducts();
      fixture.detectChanges();
     // expect(component.getAllProducts).toHaveBeenCalled();
      expect(component.status).toEqual('loading');

      tick(4000);
      fixture.detectChanges();

      expect(component.status).toEqual('error');
    }));
  });

  describe('test for callPromise', () => {
    it('should call to promise', async() => {
      const mockMessage = 'my mock string';
      valueService.getPromiseValue.and.returnValue(
        Promise.resolve(mockMessage)
      );

      await component.callPromise();
      fixture.detectChanges();

      expect(component.rta).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show my mock string in p when do click in button', fakeAsync(() => {
      const mockMessage = 'my mock string';
      valueService.getPromiseValue.and.returnValue(
        Promise.resolve(mockMessage)
      );
      
      const btnDe = fixture.debugElement.query(By.css('.btn-promise'));
      btnDe.triggerEventHandler('click',null);
      tick();
      fixture.detectChanges();
      const rtaDe = fixture.debugElement.query(By.css('.rta'));
      expect(component.rta).toEqual(mockMessage)
      expect(valueService.getPromiseValue).toHaveBeenCalled();
        expect(rtaDe.nativeElement.textContent).toEqual(mockMessage)
    }));
  });
});
