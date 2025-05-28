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

  getAll(): Observable<FDType[]> {
    return this.http.get<FDType[]>(this.apiUrl);
  }

  getById(id: number): Observable<FDType> {
    return this.http.get<FDType>(`${this.apiUrl}/${id}`);
  }

  update(id: number, data: FDType): Observable<FDType> {
    return this.http.put<FDType>(`${this.apiUrl}/${id}`, data);
  }

  // Add create and delete if needed
}
