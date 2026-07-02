import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaleService } from '../../services/sale';
import { MedicineService } from '../../../medicine/services/medicine';
import { MedicineModel } from '../../../medicine/models/medicine';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.html',
  styleUrl: './sale-create.css',
  standalone: false
})
export class SaleCreateComponent implements OnInit {
  form!: FormGroup;
  medicines: MedicineModel[] = [];
  selectedMedicine: MedicineModel | null = null;

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private medicineService: MedicineService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      medicineId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]]
    });

    this.loadMedicines();

    this.form.get('medicineId')?.valueChanges.subscribe(id => {
      this.selectedMedicine = this.medicines.find(m => m.id === id) || null;
      this.updateQuantityValidators();
    });
  }

  loadMedicines() {
    this.medicineService.getMedicines().subscribe(res => {
      this.medicines = res;
      this.cdr.markForCheck();
    });
  }

  updateQuantityValidators() {
    const qtyControl = this.form.get('quantity');
    if (this.selectedMedicine && qtyControl) {
      qtyControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(this.selectedMedicine.quantity),
        Validators.pattern(/^[0-9]+$/)
      ]);
      qtyControl.updateValueAndValidity();
    }
  }

  onQuantityKeyPress(event: KeyboardEvent): boolean {
    return /^[0-9]$/.test(event.key);
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.saleService.createSale(this.form.value).subscribe(res => {
      if (res) {
        alert('Sale recorded successfully');
        this.router.navigate(['/sales']);
        this.cdr.markForCheck();
      } else {
        alert('Failed to record sale. Please verify stock.');
      }
    });
  }
}
