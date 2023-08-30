import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { WorkComponent } from '../components/work/work.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'work', component: WorkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
