import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { BookbankComponent } from './components/bookbank/bookbank.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { BookbankAddComponent } from './components/bookbank/bookbank-add/bookbank-add.component';
import { BookbankEditComponent } from './components/bookbank/bookbank-edit/bookbank-edit.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyAddComponent } from './components/company/company-add/company-add.component';
import { CompanyEditComponent } from './components/company/company-edit/company-edit.component';

const routes: Routes = [
  { path: '', component: SettingComponent },
  
  { path: 'bookbank', component: BookbankComponent },
  { path: 'bookbank/new', component: BookbankAddComponent },
  { path: 'bookbank/edit/:id', component: BookbankEditComponent },

  { path: 'customer', component: CustomerComponent },
  { path: 'customer/new', component: CustomerAddComponent },
  { path: 'customer/edit/:id', component: CustomerEditComponent },

  { path: 'company', component: CompanyComponent },
  { path: 'company/new', component: CompanyAddComponent },
  { path: 'company/edit/:id', component: CompanyEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
