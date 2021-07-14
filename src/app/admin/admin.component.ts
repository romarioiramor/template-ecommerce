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

  productsView: boolean = false;
  suporteView: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.viewProdutos();
  }

  viewProdutos(){
    this.productsView = true;
    this.suporteView = false;
  }
  viewSuporte(){
    this.suporteView = true;
    this.productsView = false;
  }
 
}
