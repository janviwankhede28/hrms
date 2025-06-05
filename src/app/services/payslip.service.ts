import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PayslipService {
  private baseUrl = 'http://localhost:8080/api/salary/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllSalaryByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`, {
      headers: this.getHeaders()
    });
  }

  getSalaryByEmailAndMonth(email: string, month: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/month?email=${email}&month=${month}`, {
      headers: this.getHeaders()
    });
  }

  downloadSlipById(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/id/${id}`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }
}
