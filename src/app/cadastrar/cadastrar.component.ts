import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';
import { ClientsService } from '../shared/service/clients.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  
  email ="";
  password ="";
  cpf ="";
  name ="";
  birth ="";
  gender = "";
  telphone ="";
  message ="";
  clientData: any;
  errorMessage =""; //para manipular erro de validação
  error: { name: string, message: string } = { name: "", message: "" }; // para o firebase lidar com o erro

  constructor(private authservice: AuthService, private router: Router, private serviceClient: ClientsService) { }

  ngOnInit(): void {
    this.clientData = {};
  }

  clearErrorMessage() {
    this.errorMessage = "";
    this.error = { name: "", message: ""};
  }

  cadastrar(_frmClient: NgForm) {
    this.serviceClient.addClient(this.clientData);

    this.clearErrorMessage();
    if (this.validateForm(this.clientData.email, this.clientData.password)) {
      this.authservice.register(this.clientData.email, this.clientData.password)
      .then(() => {
        this.message ='Você está cadastrado no sistema';
        this.router.navigate(['/login'])
        Swal.fire('Cadastrado!', 'Cadastro realizado com sucesso!', 'success');
      }).catch(_error => {
        this.error = _error
        this.router.navigate(['/cadastrar'])
        Swal.fire('Erro!', 'Não foi possivel realizar o cadastro!', 'error');
      })
    }
  }

  validateForm(email: string | any[], password: string | any[]) {
    if(email.length === 0) {
      this.errorMessage = 'Por favor, verifique seu email!!!';
      return false;
    }
    if(password.length === 0) {
      this.errorMessage = 'Por favor, verifique sua senha!!!';
      return false;
    }
    if(password.length < 5) {
      this.errorMessage = 'Sua senha não pode ser menor que 6 digitos!!!';
      return false;
    }
    return true;
  }

}
