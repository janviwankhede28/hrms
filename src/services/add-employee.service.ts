
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeService {

  private api = 'http://localhost:8080/api/employees';
  private api2 = 'http://localhost:8080/Employee/register'; // Use your actual API URL

  constructor(private http: HttpClient) {}

  // ✅ Common method to get headers with JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Ya jahan bhi aap token store kar rahe ho
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ Get all employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.api, { headers: this.getHeaders() });
  }

  // ✅ Add new employee
  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.api, employee, { headers: this.getHeaders() });
  }

  // ✅ Update employee
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, employee, { headers: this.getHeaders() });
  }

  // ✅ Delete employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`, { headers: this.getHeaders() });
  }


// registerEmployee
registerEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.api2, employee, { headers: this.getHeaders() });
  }
}
