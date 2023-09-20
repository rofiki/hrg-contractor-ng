import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './components/setting/setting.component';
import { AdminModule } from '../admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';

import { BookbankComponent } from './components/bookbank/bookbank.component';
import { BookbankAddComponent } from './components/bookbank/bookbank-add/bookbank-add.component';
import { BookbankEditComponent } from './components/bookbank/bookbank-edit/bookbank-edit.component';

@NgModule({
  declarations: [
    SettingComponent,
  
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    
    BookbankComponent,
    BookbankAddComponent,
    BookbankEditComponent,

  
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    AdminModule,

    HttpClientModule,
    ReactiveFormsModule,  
    
  ],
})
export class SettingModule { }
