import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MedicineModel } from '../models/medicine';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private apiUrl = `${environment.apiUrl}/medicines`;
  
  constructor(private http: HttpClient) { }

  getMedicines(search?: string): Observable<MedicineModel[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<MedicineModel[]>(this.apiUrl, { params });
  }

  getMedicine(id: string): Observable<MedicineModel> {
    return this.http.get<MedicineModel>(`${this.apiUrl}/${id}`);
  }

  addMedicine(medicine: MedicineModel): Observable<MedicineModel> {
    return this.http.post<MedicineModel>(this.apiUrl, medicine);
  }

  updateMedicine(id: string, medicine: MedicineModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medicine);
  }

  deleteMedicine(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
