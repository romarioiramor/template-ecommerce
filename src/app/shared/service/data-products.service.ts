import { Injectable } from '@angular/core';
import { Products } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class DataProductsService {

  private produtos!: Products;

  constructor() { }

  setProductsData(produtos: Products){
    this.produtos = produtos;
  }

  getProductData(){
    return this.produtos;
  }
}
