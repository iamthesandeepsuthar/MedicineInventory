export interface SaleModel {
  id: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  saleDate: string;
}

export interface SaleCreateDto {
  medicineId: string;
  quantity: number;
}
