import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineRoutingModule } from './medicine-routing-module';
import { MedicineListComponent } from './components/medicine-list/medicine-list';
import { MedicineUpsertComponent } from './components/medicine-upsert/medicine-upsert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MedicineListComponent,
    MedicineUpsertComponent
  ],
  imports: [
    CommonModule,
    MedicineRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MedicineModule { }
