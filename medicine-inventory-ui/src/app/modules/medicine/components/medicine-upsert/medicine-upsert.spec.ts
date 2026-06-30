import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineUpsert } from './medicine-upsert';

describe('MedicineUpsert', () => {
  let component: MedicineUpsert;
  let fixture: ComponentFixture<MedicineUpsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineUpsert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineUpsert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
