import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './components/setting/setting.component';
import { BookbankComponent } from './components/bookbank/bookbank.component';
import { AdminModule } from '../admin/admin.module';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingComponent,
    BookbankComponent,
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,

  
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
