import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BankaccountComponent } from './components/bankaccount/bankaccount.component';
import { CustomerComponent } from './components/customer/customer.component';
import { MycompanyComponent } from './components/mycompany/mycompany.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'bankaccount', component: BankaccountComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'mycompany', component: MycompanyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
