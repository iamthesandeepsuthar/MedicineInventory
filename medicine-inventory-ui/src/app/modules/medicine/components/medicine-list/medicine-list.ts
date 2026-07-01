import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../services/medicine';
import { Router } from '@angular/router';
import { MedicineModel } from '../../models/medicine';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.html',
  styleUrl: './medicine-list.css',
  standalone :false
})
 
export class MedicineListComponent implements OnInit {

  medicines: MedicineModel[] = [];
  search = '';

  constructor(
    private medicineService: MedicineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.medicineService
      .getMedicines(this.search)
      .subscribe(res => {
        this.medicines = res;
      });
  }

  delete(id: string) {
    if (!confirm('Delete medicine?')) {
      return;
    }

    this.medicineService
      .deleteMedicine(id)
      .subscribe(() => {
        this.load();
      });
  }

  edit(id: string) {
    this.router.navigate(['/medicines/edit', id]);
  }

  getMedicineClass(medicine: MedicineModel): string {
    const expiry = new Date(medicine.expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const diffDays =
      (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diffDays < 30) {
      return 'expiry-soon';
    }

    if (medicine.quantity < 10) {
      return 'low-stock';
    }

    return '';
  }
  
}