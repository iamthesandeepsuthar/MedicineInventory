import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleRoutingModule } from './sale-routing-module';
import { SaleListComponent } from './components/sale-list/sale-list';
import { SaleCreateComponent } from './components/sale-create/sale-create';

@NgModule({
  declarations: [
    SaleListComponent,
    SaleCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaleRoutingModule
  ]
})
export class SaleModule {}
