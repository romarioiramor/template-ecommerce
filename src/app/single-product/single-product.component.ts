import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressClient } from '../shared/model/addressClient.model';
import { Bought } from '../shared/model/bought.model';
import { Clients } from '../shared/model/clients.model';
import { PaymentForm } from '../shared/model/payment-form.module';
import { Products } from '../shared/model/products.model';
import { ClientsService } from '../shared/service/clients.service';
import { DataProductsService } from '../shared/service/data-products.service';
import { PaymentFormService } from '../shared/service/payment-form.service';
import { ProductsService } from '../shared/service/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  produtos!: Products[];
  produtosData!: Products;
  tipoPagamento: any;
  paymentForm: PaymentForm[] = [];
  clients: Clients[] = [];
  client: any;
  found: any;
  addressData: AddressClient[] = [];
  boughtData: Bought[] = [];
  payment: any;
  address: any;
  bought: any;
  cart: any;
  authState: any;
  userLogin!: string;

  constructor(private afu: AngularFireAuth, private router: Router,private dataProductsService: DataProductsService, private servicePayment: PaymentFormService, private serviceClient: ClientsService, public productsService: ProductsService) { 
  }

  ngOnInit() {
    this.getProducts();
    this.getPaymentForm();
    this.getUserLogin()
    this.getClients();
    this.getAddress();
    this.payment = {};
    this.address = {};
    this.bought = {};
    this.produtosData = this.dataProductsService.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.produtos = data
      console.log('aqui', data)
    }) 
  }

  getUserLogin(){
    this.afu.authState.subscribe(auth => {
      this.authState = auth;
      this.userLogin = this.authState.email;
      console.log("user",this.userLogin)
    })
  }

  changeTipo(tipo: any){
    this.tipoPagamento = tipo;
  }

  getPaymentForm() {
    this.servicePayment.getPayment().subscribe(data => {
      this.paymentForm = data
      console.log('aqui payemnte', data)
    }) 
  }

  getClients() {
    this.serviceClient.getClient().subscribe(data => {
      this.clients = data;
      this.client = this.clients.find( clients => clients.email == this.userLogin);
      console.log('clients', this.client)
    }) 
  }

  getAddress() {
    this.serviceClient.getAddress().subscribe(data => {
      this.addressData = data
      console.log('addres', data)
    }) 
  }

  goToModalComprarByService(produtos: Products){
    this.dataProductsService.setProducts(produtos);
    this.router.navigateByUrl('/single-product')
  }

  addAddress(frm: NgForm){
    this.address.id = 1;
    this.serviceClient.addAddress(this.address);
    this.addPayment(frm);
  }

  addPayment(frm: NgForm){
    this.payment.id = 1;
    this.payment.address = this.address;
    this.servicePayment.addFormPayment(this.payment)
    this.addBougth(frm);
  }

  addBougth(frm: NgForm){
    this.bought.id = 1;
    this.bought.statusPay = "ANALISE";
    this.bought.paymentForm = this.payment;
    this.bought.clients = this.client;
    this.bought.products = this.produtosData;
    this.serviceClient.addBought(this.bought);
    this.router.navigate(['/comprados'])
  }

  addCart(){
    this.cart.clients = this.client;
    this.cart.products = this.produtosData;
    this.serviceClient.addCart(this.cart);
  }

}
