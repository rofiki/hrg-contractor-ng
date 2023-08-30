import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './components/setting/setting.component';
import { BookbankComponent } from './components/bookbank/bookbank.component';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  declarations: [
    SettingComponent,
    BookbankComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    AdminModule
  ],
})
export class SettingModule { }
