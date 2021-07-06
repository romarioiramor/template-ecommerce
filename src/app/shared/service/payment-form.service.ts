import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentForm } from '../model/payment-form.module';

@Injectable({
  providedIn: 'root'
})
export class PaymentFormService {

  apiUrl = "http://localhost:8080/api/v1/paymentForm";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getPayment() {
    return this.httpClient.get<PaymentForm[]>(this.apiUrl)
  }

  addFormPayment(frm: NgForm) {
    return this.httpClient.post(this.apiUrl, JSON.stringify(frm), this.httpOptions).subscribe(results=>{
      console.log(results);
    });
  }

}
