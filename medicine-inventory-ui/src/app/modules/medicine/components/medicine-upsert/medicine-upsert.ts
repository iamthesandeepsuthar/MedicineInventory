import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../services/medicine';

@Component({
  selector: 'app-medicine-upsert',  
  templateUrl: './medicine-upsert.html',
  styleUrl: './medicine-upsert.css',
  standalone : false
})
export class MedicineUpsertComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  id = '';

  constructor(
    private fb: FormBuilder,
    private service: MedicineService,
    private route: ActivatedRoute,
    private router: Router
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
          this.form.patchValue(res);
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
          this.router.navigate(['/medicines']);
        });

      return;
    }

    this.service
      .addMedicine(this.form.value)
      .subscribe(() => {
        this.router.navigate(['/medicines']);
      });
  }
}