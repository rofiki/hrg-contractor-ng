import { NgModule, Pipe } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CostAddComponent } from './components/cost/cost-add/cost-add.component';
import { CostEditComponent } from './components/cost/cost-edit/cost-edit.component';
import { CostListComponent } from './components/cost/cost-list/cost-list.component';

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
    CostAddComponent,
    CostEditComponent,
    CostListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BsDropdownModule.forRoot(),

    BsDatepickerModule.forRoot(),
    // defineLocale,
    // deLocale,

    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ModalModule.forRoot(),


  ],
  providers:[DatePipe],
  exports: [
    HeaderComponent,
    FooterComponent]
})
export class AdminModule { }
