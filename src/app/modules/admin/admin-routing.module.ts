import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { WorkComponent } from './components/work/work.component';
import { CostComponent } from './components/cost/cost.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'work', component: WorkComponent },
  { path: 'cost', component: CostComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
