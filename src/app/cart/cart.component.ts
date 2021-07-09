import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ShoppingCart } from '../shared/model/shopping-cart.module';
import { ClientsService } from '../shared/service/clients.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carrinho!: ShoppingCart[];
  carrinhoUser: any;
  authState: any = null;
  userLogin!: string;

  constructor(private afu: AngularFireAuth, private clientServe: ClientsService) { 
  }

  ngOnInit(): void {
    this.getCarrinho();
  }

  getCarrinho(){
    this.clientServe.getCart().subscribe(data => {
      this.carrinho = data
      this.carrinho.find( carrinho => carrinho.clients.email == this.userLogin);
      console.log('carrinho', this.carrinho)
    }) 
  }

}
