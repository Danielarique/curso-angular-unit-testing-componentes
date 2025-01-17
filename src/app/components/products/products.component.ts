import { Component, OnInit } from '@angular/core';
import { ValueService } from '../../services/value.service';
import { Product } from './../../models/product.model';

import { ProductsService } from './../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  status: 'loading' | 'error' | 'init' | 'success' = 'init';
  limit = 10;
  offset = 0;
  rta = '';
  constructor(
    private productsService: ProductsService,
    private valueService: ValueService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productsService.getAll(this.limit,this.offset)
    .subscribe(
      {next:(products) => {
      this.status = 'success';
      this.offset += this.limit;
      this.products = [...this.products, ...products];
    },
    error: error=>{
      setTimeout(()=>{
        this.products = [];
        this.status = 'error';
      },3000)
   
    }
  });
  }

  async callPromise(){
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
    
  }

}
