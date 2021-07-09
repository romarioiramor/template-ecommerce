import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Clients } from '../shared/model/clients.model';
import { Products } from '../shared/model/products.model';
import { ClientsService } from '../shared/service/clients.service';
import { DataProductsService } from '../shared/service/data-products.service';
import { ProductsService } from '../shared/service/products.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [NgbCarouselConfig]
})
export class IndexComponent implements OnInit {

  produtos!: Products[];
  cart: any;
  clients: Clients[] = [];
  client: any;
  authState: any = null;
  userLogin!: string;

  constructor(private afu: AngularFireAuth, public productsService: ProductsService, private router: Router, private dataProductsService: DataProductsService, private serviceClient: ClientsService) { 
 
  }

  ngOnInit() {
    this.getUserLogin();
    this.getClients();
    this.getProducts();
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

  getClients() {
    this.serviceClient.getClient().subscribe(data => {
      this.clients = data;
      this.client = this.clients.find( clients => clients.email == this.userLogin);
      console.log('clients', this.clients)
    }) 
  }

  goToModalComprarByService(prod: Products){
    this.dataProductsService.setProductsData(prod);
    this.router.navigateByUrl('/single-product')
  }

  addCart(produtos: Products){
    this.cart.clients = this.client;
    this.cart.products = produtos;
    this.serviceClient.addCart(this.cart);
  }

}
