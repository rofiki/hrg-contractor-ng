import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MycompanyComponent } from './components/mycompany/mycompany.component';
import { BankaccountComponent } from './components/bankaccount/bankaccount.component';
import { CustomerComponent } from './components/customer/customer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

    AdminDashboardComponent,
    MycompanyComponent,
    BankaccountComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
