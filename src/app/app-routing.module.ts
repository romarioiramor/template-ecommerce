import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ShopComponent } from './shop/shop.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CompradosComponent } from './comprados/comprados.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'cadastrar', component: CadastrarComponent},
  { path: 'comprados', component: CompradosComponent},
  { path: '', component: IndexComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'single-product', component: SingleProductComponent },
  { path: 'cart', component: CartComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
