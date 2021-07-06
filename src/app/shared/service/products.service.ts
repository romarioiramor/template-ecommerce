import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Products } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  apiUrl = "http://localhost:8080/api/v1/products";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getProducts() {
    return this.httpClient.get<Products[]>(this.apiUrl)
  }

  addProduct(frmProduct: NgForm) {
    return this.httpClient.post(this.apiUrl, JSON.stringify(frmProduct), this.httpOptions).subscribe(results=>{
      console.log(results);
    });
  }
}
