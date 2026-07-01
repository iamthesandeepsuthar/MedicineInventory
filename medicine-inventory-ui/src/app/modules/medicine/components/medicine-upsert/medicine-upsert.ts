import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../services/medicine';

@Component({
  selector: 'app-medicine-upsert',
  templateUrl: './medicine-upsert.html',
  styleUrl: './medicine-upsert.css',
  standalone: false
})
export class MedicineUpsertComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  id = '';

  constructor(
    private fb: FormBuilder,
    private service: MedicineService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      fullName: ['', Validators.required],
      notes: [''],
      expiryDate: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      brand: ['', Validators.required]
    });

    this.id =
      this.route.snapshot.paramMap.get('id') ?? '';

    if (this.id) {
      this.isEdit = true;

      this.service
        .getMedicine(this.id)
        .subscribe(res => {
          this.form.patchValue({
            ...res,
            expiryDate: res.expiryDate
              ? res.expiryDate.toString().substring(0, 10)
              : ''
          });
        });
    }
  }

  save() {

    if (this.form.invalid) {
      return;
    }

    if (this.isEdit) {

      this.service
        .updateMedicine(
          this.id,
          this.form.value
        )
        .subscribe(() => {
          alert('Medicine updated successfully');
          this.router.navigate(['/medicines']);
          this.cdr.markForCheck();
        });

      return;
    }

    this.service
      .addMedicine(this.form.value)
      .subscribe(() => {
        alert('Medicine added successfully');
        this.router.navigate(['/medicines']);
        this.cdr.markForCheck();
      });
  }
}