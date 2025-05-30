import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FDType } from '../_models/fdtype.model';

@Injectable({
  providedIn: 'root'
})
export class FDTypeService {
  private apiUrl = 'https://localhost:7001/api/FDType';

  constructor(private http: HttpClient) { }
  getAll(includeInactive: boolean = true): Observable<FDType[]> {
    return this.http.get<FDType[]>(`${this.apiUrl}?includeInactive=${includeInactive}`);
  }

  getById(id: number): Observable<FDType> {
    return this.http.get<FDType>(`${this.apiUrl}/${id}`);
  }

  update(id: number, data: FDType): Observable<FDType> {
    return this.http.put<FDType>(`${this.apiUrl}/${id}`, data);
  }

  toggleStatus(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, {});
  }
 
}
