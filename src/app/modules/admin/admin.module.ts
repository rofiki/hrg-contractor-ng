import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  exports:[
    HeaderComponent,
    FooterComponent]
})
export class AdminModule { }
