import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';
import { Clients } from '../shared/model/clients.model';
import { ClientsService } from '../shared/service/clients.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: any = null;
  adminPermission!: boolean;
  clients: Clients[] = [];
  client: any;
  userLogin!: string;
  suport: any;
  data: any;

  constructor(public authservice: AuthService, private serviceClient: ClientsService, private afu: AngularFireAuth, private router: Router) {
    this.afu.authState.subscribe((auth => {
      this.authState = auth;
    }))
   }

  ngOnInit(): void {
    this.getUserLogin();
    this.suport = {};
  }

  get currenteUserName(): string {
    return this.authState['email']
  }

  getUserLogin(){
    this.afu.authState.subscribe(auth => {
      this.authState = auth;
      this.userLogin = this.authState.email;
      this.getClients();
    })
  }

  getClients() {
    this.serviceClient.getClient().subscribe(data => {
      this.clients = data;
      this.client = this.clients.find( clients => clients.email == this.userLogin);
      this.getPermissao();
    }) 
  }

  getPermissao(){
    if(this.client.admin_permission == true){
      this.adminPermission = true;
    }else {
      this.adminPermission = false;
    }
  }

  addSuporte(frm: NgForm){
    this.suport.id = 1;
    this.suport.service = 2;
    this.suport.clients = this.client;
    this.suport.attended = false;
    this.serviceClient.addSuporte(this.suport);
    this.router.navigate(['/']);
    Swal.fire('Ok!', 'Supporte registrado com sucesso!', 'success');
  }

}
