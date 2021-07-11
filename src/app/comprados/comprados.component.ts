import { JsonpClientBackend } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/services/auth.service';
import { JsonObjectExpression } from 'typescript';
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
  compradosUser!: any;
  clients: Clients[] = [];
  client: any;
  found: any;
  authState: any = null;
  userLogin!: string;

  constructor(private afu: AngularFireAuth, private serviceClient: ClientsService, private clientServe: ClientsService) {
  }

  ngOnInit(): void {
    this.getUserLogin();
  }

  getUserLogin() {
    this.afu.authState.subscribe(auth => {
      this.authState = auth;
      this.userLogin = this.authState.email;
      console.log("user", this.userLogin);
      this.getComprados();
    })
  }

  getComprados() {
    this.clientServe.getBougth().subscribe(data => {
      this.comprados = data
      this.compradosUser = this.comprados.filter(comprados => comprados.clients.email == this.userLogin);
      console.log('compras', this.comprados)
      console.log('compras', this.compradosUser)
    })
  }


}
