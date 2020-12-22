import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WrapperComponent} from './components/mainpage/wrapper/wrapper.component';
import {LoginComponent} from './components/mainpage/login/login.component';
import {ManagejeansoverviewComponent} from './components/managejeans/managejeansoverview.component';
import {OrderhistoryComponent} from './components/orderhistory/orderhistory.component';
import {CreateorderComponent} from './components/orders/createorder/createorder.component';
import {CustomizeOrderComponent} from './components/orders/customize-order/customize-order.component';
import {PendingOrderComponent} from './components/orders/pending-order/pending-order.component';
import {HomeComponent} from './components/mainpage/home/home.component';
import {UploadfileComponent} from './components/uploadfile/uploadfile.component';

const routes: Routes = [{
  path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'uploadfile', component: UploadfileComponent},
  {path: 'managejeans', component: ManagejeansoverviewComponent},
  {path: 'orderhistory', component: OrderhistoryComponent},
  {path: 'createorder', component: CreateorderComponent},
  {path: 'customizeorder', component: CustomizeOrderComponent},
  {path: 'pendingorder', component: PendingOrderComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
