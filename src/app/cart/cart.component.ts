import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Products } from '../shared/model/products.model';
import { ShoppingCart } from '../shared/model/shopping-cart.module';
import { ClientsService } from '../shared/service/clients.service';
import { DataProductsService } from '../shared/service/data-products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carrinho!: ShoppingCart[];
  cart: any;
  carrinhoUser!: any;
  authState: any = null;
  userLogin!: string;

  constructor(private afu: AngularFireAuth, private router: Router, private dataProductsService: DataProductsService, private clientServe: ClientsService, private serviceClient: ClientsService) { 
  }

  ngOnInit(): void {
    this.getUserLogin();
    // this.cart = {};
  }

  getUserLogin() {
    this.afu.authState.subscribe(auth => {
      this.authState = auth;
      this.userLogin = this.authState.email;
      console.log("user", this.userLogin);
      this.getCarrinho();
    })
  }

  getCarrinho(){
    this.clientServe.getCart().subscribe(data => {
      this.carrinho = data
      this.carrinhoUser = this.carrinho.filter(carrinho => carrinho.clients.email == this.userLogin);
      console.log('carrinho', this.carrinho)
      console.log('carrinho', this.carrinhoUser)
    }) 
  }

  goToModalComprarByService(prod: Products){
    this.dataProductsService.setProductsData(prod);
    this.router.navigateByUrl('/single-product');
  }

  // removeCart(){
  //   this.cart.id = 0;
  //   console.log("addcart",this.cart)
  //   this.serviceClient.addCart(this.cart);
  // }

}
