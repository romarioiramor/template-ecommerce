import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  email ="";
  password ="";
  errorMessage =""; //para manipular erro de validação
  error: { name: string, message: string } = { name: "", message: "" }; // para o firebase lidar com o erro

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {}

  clearErrorMessage() {
    this.errorMessage = "";
    this.error = { name: "", message: ""};
  }

  login() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.login(this.email, this.password)
      .then(() => {
         this.router.navigate(['/']);
         Swal.fire('LOGIN!', 'Realizado com sucesso!', 'success');
      }).catch((_error: { name: string; message: string; }) => {
        this.error = _error
        this.router.navigate(['/login']);
        Swal.fire('Algo errado!', 'Não foi possivel realizar o Login!', 'error');
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
    this.errorMessage = '';
    return true;
  }

}
