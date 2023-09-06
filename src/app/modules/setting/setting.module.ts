import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './components/setting/setting.component';
import { BookbankComponent } from './components/bookbank/bookbank.component';
import { AdminModule } from '../admin/admin.module';
import { CustomerComponent } from './components/customer/customer.component';

@NgModule({
  declarations: [
    SettingComponent,
    BookbankComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    AdminModule
  ],
})
export class SettingModule { }
