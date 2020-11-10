import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/mainpage/header/header.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { FooterComponent } from './components/mainpage/footer/footer.component';
import { LoginComponent } from './components/mainpage/login/login.component';
import { WrapperComponent } from './components/mainpage/wrapper/wrapper.component';
import {RouterModule, Routes} from "@angular/router";
import { ManagejeansoverviewComponent } from './components/managejeans/managejeansoverview.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { OrderhistoryComponent } from './components/orderhistory/orderhistory.component';
import { CreateorderComponent } from './components/orders/createorder/createorder.component';
import { CustomizeOrderComponent } from './components/orders/customize-order/customize-order.component';
import { PendingOrderComponent } from './components/orders/pending-order/pending-order.component';

const appRoutes: Routes = [
  {path: '',   redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: WrapperComponent},
  {path: 'login', component: LoginComponent},
  {path: 'managejeans', component: ManagejeansoverviewComponent},
  {path: 'orderhistory', component: OrderhistoryComponent},
  {path: 'createorder', component: CreateorderComponent},
  {path: 'customizeorder', component: CustomizeOrderComponent},
  {path: 'pendingorder', component: PendingOrderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    WrapperComponent,
    ManagejeansoverviewComponent,
    OrderhistoryComponent,
    CreateorderComponent,
    CustomizeOrderComponent,
    PendingOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    CommonModule
  ],

  exports:[RouterModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
