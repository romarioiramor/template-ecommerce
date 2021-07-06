import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Bought } from '../shared/model/bought.model';
import { Clients } from '../shared/model/clients.model';
import { Products } from '../shared/model/products.model';
import { ClientsService } from '../shared/service/clients.service';

@Component({
  selector: 'app-comprados',
  templateUrl: './comprados.component.html',
  styleUrls: ['./comprados.component.css']
})
export class CompradosComponent implements OnInit {

  comprados: Bought[] = [];
  clients: Clients[] = [];
  client: any;
  found: any;

  constructor(public authservice: AuthService, private serviceClient: ClientsService, private clientServe: ClientsService) {
 
   }

  ngOnInit(): void {
    this.getClients();
    this.getComprados();
  }

  getClients() {
    this.serviceClient.getClient().subscribe(data => {
      this.clients = data
      this.client = this.clients.find( clients => clients);
      console.log('clients', this.client)
    }) 
  }

  getComprados(){
    this.clientServe.getBougth().subscribe(data => {
      this.comprados[0].products = data
      console.log('compras', this.comprados)
    }) 
  }


}
