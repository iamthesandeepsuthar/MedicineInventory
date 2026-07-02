import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleModel, SaleCreateDto } from '../models/sale';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  getSales(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(this.apiUrl);
  }

  createSale(sale: SaleCreateDto): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, sale);
  }
}
