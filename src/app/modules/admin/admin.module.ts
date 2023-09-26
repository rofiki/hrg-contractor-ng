import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WorkComponent } from './components/work/work.component';
import { CostComponent } from './components/cost/cost.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { PaymentComponent } from './components/payment/payment.component';
import { WorkStatusComponent } from './components/work/work-status/work-status.component';
import { WorkAddComponent } from './components/work/work-add/work-add.component';
import { WorkEditComponent } from './components/work/work-edit/work-edit.component';
import { WorkDetailComponent } from './components/work/work-detail/work-detail.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

    AdminDashboardComponent,
    WorkComponent,
    CostComponent,
    ReceiptComponent,
    PaymentComponent,
    WorkStatusComponent,
    WorkAddComponent,
    WorkEditComponent,
    WorkDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BsDropdownModule.forRoot(),

  ],
  exports:[
    HeaderComponent,
    FooterComponent]
})
export class AdminModule { }
