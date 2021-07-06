import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../model/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  apiUrl = "https://boacompralast-api.herokuapp.com/api/v1/suppliers";

  httpOption = {
    headers: new HttpHeaders({
      'Content- Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getSupplier() {
    return this.httpClient.get<Supplier[]>(this.apiUrl)
  }

}
