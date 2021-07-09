import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Clients } from 'src/app/shared/model/clients.model';
import { ClientsService } from 'src/app/shared/service/clients.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  userLogin!: string;

  constructor(private afu: AngularFireAuth, private router: Router) {
    this.afu.authState.subscribe((auth => {
      this.authState = auth;
    }))
   }

   //all firebase getdata functions

   get isUserAnonymousLoggedIn(): boolean {
     return (this.authState !== null) ? this.authState.isAnonymous : false
   }

   get currentUserId(): string {
     return (this.authState !== null) ? this.authState.uid : ''
   }

   get currenteUserName(): string {
     return this.authState['email']
   }

   get currentUser(): any {
     return (this.authState !== null) ? this.authState : null;
   }

   get isUserEmailLoggedIn(): boolean {
     if((this.authState !== null) && (this.isUserAnonymousLoggedIn)) {
       return true
     } else {
       return false
     }
   }

   register(email: string, password: string) {
    return this.afu.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user
    }).catch(error => {
      console.log(error)
      throw error
    });
   }

   getUserLogin(){
    this.afu.authState.subscribe(auth => {
      this.authState = auth;
      this.userLogin = this.authState.email;
      console.log("user",this.userLogin)
    })
  }


   login(email: string, password: string) {
    return this.afu.signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user
    }).catch(error => {
      console.log(error)
      throw error
    });
   }

   sair(): void {
    this.afu.signOut();
    this.router.navigate(['/login']);
   }


}
