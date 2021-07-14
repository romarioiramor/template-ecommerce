import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressClient } from '../model/addressClient.model';
import { Bought } from '../model/bought.model';
import { Clients } from '../model/clients.model';
import { ShoppingCart } from '../model/shopping-cart.module';
import { Support } from '../model/support.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  
  apiUrl = "http://localhost:8080/api/v1/clients";

  apiUrlAddress = "http://localhost:8080/api/v1/address";

  apiUrlSupport = "http://localhost:8080/api/v1/support";

  apiUrlBougth =  "http://localhost:8080/api/v1/bought";

  apiUrlCart =  "http://localhost:8080/api/v1/shoppingCart";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getClient() {
    return this.httpClient.get<Clients[]>(this.apiUrl)
  }

  getAddress() {
    return this.httpClient.get<AddressClient[]>(this.apiUrlAddress)
  }

  getSupport() {
    return this.httpClient.get<Support[]>(this.apiUrlSupport)
  }

  getBougth() {
    return this.httpClient.get<Bought[]>(this.apiUrlBougth)
  }

  getCart() {
    return this.httpClient.get<ShoppingCart[]>(this.apiUrlCart)
  }

  addClient(frmClient: NgForm) {
    return this.httpClient.post(this.apiUrl, JSON.stringify(frmClient), this.httpOptions).subscribe(results=>{
      console.log(results);
    });
  }

  addAddress(frm: NgForm) {
    return this.httpClient.post(this.apiUrlAddress, JSON.stringify(frm), this.httpOptions).subscribe(results=>{
      console.log(results);
    });
  }

  addBought(frm: NgForm) {
    return this.httpClient.post(this.apiUrlBougth, JSON.stringify(frm), this.httpOptions).subscribe(results=>{
      console.log(results);
    });
  }

  addCart(frm: NgForm) {
    return this.httpClient.post(this.apiUrlCart, JSON.stringify(frm), this.httpOptions).subscribe(results=>{
      console.log(results);
    });
  }

  addSuporte(frm: NgForm) {
    return this.httpClient.post(this.apiUrlSupport, JSON.stringify(frm), this.httpOptions).subscribe(results=>{
      console.log(results);
    });
  }

}
