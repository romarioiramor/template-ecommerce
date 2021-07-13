import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables, LinearScale, Title} from 'chart.js';
import { Products } from '../shared/model/products.model';
import { ProductsService } from '../shared/service/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild("meuCanvas", { static: true })
  elemento!: ElementRef; 

  produtos!: Products[];
  totalNoEstoqueProducts: any;
  totalProductsPrice: any;
  valorTotalEstoque: any;
  produtoQuantidade: any;
  produtoPreco: any;

  constructor(public productsService: ProductsService) {
    Chart.register(...registerables);
   }
  ngOnInit(): void {
    this.getProducts();
    new Chart(this.elemento.nativeElement, {
      type: "line",
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [{
          label: 'Meu Crescimento',
          data: [10, 30, 45, 25, 50],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.produtos = data
      this.produtoQuantidade = this.produtos.map(function(item){
         return item.productQuantity;
      })
      this.produtoPreco = this.produtos.map(function(item){
        return item.productPrice;
     })
      this.totalNoEstoqueProducts = this.produtoQuantidade.reduce((total: any, productQuatity: any) => total + productQuatity);
      this.totalProductsPrice = this.produtoPreco.reduce((total: any, productPrice: any) => total + productPrice);
      this.valorTotalEstoque = this.totalNoEstoqueProducts * this.totalProductsPrice;   
    }) 
  }

}
