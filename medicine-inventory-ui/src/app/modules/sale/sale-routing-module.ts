import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleListComponent } from './components/sale-list/sale-list';
import { SaleCreateComponent } from './components/sale-create/sale-create';

const routes: Routes = [
  {
    path: '',
    component: SaleListComponent
  },
  {
    path: 'create',
    component: SaleCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule {}
