// src/app/services/payslip.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PayslipService {
  private baseUrl = 'http://localhost:8080/api/salary';

  constructor(private http: HttpClient) {}

  getAllSalaryByEmail(email: string) {
    return this.http.get(`${this.baseUrl}/email/${email}`);
  }

  getSalaryByEmailAndMonth(email: string, month: string) {
    return this.http.get(`${this.baseUrl}/Email/month?email=${email}&month=${month}`);
  }

  downloadSalarySlip(id: number) {
    return this.http.get(`${this.baseUrl}/id/${id}`, { responseType: 'blob' });
  }
}
