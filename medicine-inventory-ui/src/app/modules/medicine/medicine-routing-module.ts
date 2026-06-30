import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineListComponent } from './components/medicine-list/medicine-list';
import { MedicineUpsertComponent } from './components/medicine-upsert/medicine-upsert';
 
const routes: Routes = [
  {
    path: '',
    component: MedicineListComponent
  },
  {
    path: 'add',
    component: MedicineUpsertComponent
  },
  {
    path: 'edit/:id',
    component: MedicineUpsertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
