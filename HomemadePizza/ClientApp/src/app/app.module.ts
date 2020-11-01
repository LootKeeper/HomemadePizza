import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { StoreComponent } from './components/store/store.component';
import { LabelComponent } from './components/common/label/label.component';
import { DescriptionComponent } from './components/common/description/description.component';
import { PizzaSnippetComponent } from './components/common/pizza-snippet/pizza-snippet.component';
import { CartItemSnippetComponent } from './components/common/cart-item-snippet/cart-item-snippet.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ButtonComponent } from './components/common/button/button.component';
import { BadgeComponent } from './components/common/badge/badge.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { InputComponent } from './components/common/input/input.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    NavMenuComponent,

    // common components
    LabelComponent,
    DescriptionComponent,
    PizzaSnippetComponent,
    CartItemSnippetComponent,
    ButtonComponent,
    BadgeComponent,
    InputComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'menu', pathMatch: 'full'},
      { path: 'menu', component: StoreComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'cart', component: CartComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
