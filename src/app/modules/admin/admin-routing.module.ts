import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { WorkComponent } from './components/work/work.component';
import { CostComponent } from './components/cost/cost.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { PaymentComponent } from './components/payment/payment.component';
import { WorkStatusComponent } from './components/work/work-status/work-status.component';
import { WorkAddComponent } from './components/work/work-add/work-add.component';
import { WorkDetailComponent } from './components/work/work-detail/work-detail.component';
import { WorkEditComponent } from './components/work/work-edit/work-edit.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AdminDashboardComponent },

  // { path: 'work', component: WorkComponent },
  { path: 'status', component: WorkStatusComponent },
  { path: 'add', component: WorkAddComponent },
  { path: 'detail/:id', component: WorkDetailComponent },
  { path: 'edit/:id', component: WorkEditComponent },

  { path: 'cost', component: CostComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
