import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { BookbankComponent } from './components/bookbank/bookbank.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';

const routes: Routes = [
  { path: '', component: SettingComponent },
  { path: 'bookbank', component: BookbankComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customernew', component: CustomerAddComponent },
  { path: 'customeredit/:id', component: CustomerEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
