import { Component, OnInit, signal } from '@angular/core';
import { SaleService } from '../../services/sale';
import { SaleModel } from '../../models/sale';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.html',
  styleUrl: './sale-list.css',
  standalone: false
})
export class SaleListComponent implements OnInit {
  sales = signal<SaleModel[]>([]);

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSales().subscribe(res => {
      this.sales.set(res);
    });
  }
}
