import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Products } from '../shared/model/products.model';
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

  constructor(public productsService: ProductsService, private router: Router, private dataProductsService: DataProductsService) { 

  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.produtos = data
      console.log('aqui', data)
    }) 
  }

  goToModalComprarByService(produtos: Products){
    this.dataProductsService.setProducts(produtos);
    this.router.navigateByUrl('/single-product')
  }

}
