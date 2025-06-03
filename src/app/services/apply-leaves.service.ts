import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../modal/apply-leaves';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplyLeavesService {

  private baseUrl = 'http://localhost:8080/api/leaves';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // ya sessionStorage.getItem('token')
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createLeave(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(
      `${this.baseUrl}/createLeave`, 
      request, 
      { headers: this.getAuthHeaders() }
    );
  }

  getAllLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.baseUrl}/getAllLeaves`, 
      { headers: this.getAuthHeaders() }
    );
  }

  updateStatus(id: number, status: string): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(
      `${this.baseUrl}/updateStatusById/${id}/status?status=${status}`, 
      {}, 
      { headers: this.getAuthHeaders() }
    );
  }

  deleteLeave(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/DeleteLeaveById/${id}`, 
      { headers: this.getAuthHeaders(), responseType: 'text' }
    );
  }
}
