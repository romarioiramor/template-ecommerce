import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Clients } from '../shared/model/clients.model';
import { Products } from '../shared/model/products.model';
import { ClientsService } from '../shared/service/clients.service';
import { DataProductsService } from '../shared/service/data-products.service';
import { ProductsService } from '../shared/service/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  produtos!: Products[];
  cart: any;
  clients: Clients[] = [];
  client: any;

  constructor(public productsService: ProductsService, private router: Router, private dataProductsService: DataProductsService, private serviceClient: ClientsService) { }

  ngOnInit() {
    this.getProducts();
    this.cart = {};
  }

  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.produtos = data
      console.log('aqui', data)
    }) 
  }

  goToModalComprarByService(prod: Products){
    this.dataProductsService.setProductsData(prod);
    this.router.navigateByUrl('/single-product')
  }

  addCart(prod: Products){
    this.cart.id = 0;
    this.cart.clients = this.client;
    this.cart.products = prod;
    console.log("addcart",this.cart)
    this.serviceClient.addCart(this.cart);
    Swal.fire('Adicionado!', 'Produto Adicionado no Carrinho!', 'success');
  }

}
