import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/Employee';
  // private apiUrl = 'http://localhost:8080/Employee/update-password';
  // private apiUrl2 = 'http://localhost:8080/Employee/update-profile-picture';


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
      // Content-Type mat do, kyunki query param ja rahe hain, koi body nahi
    });
  }



 // getUserProfile(userId: number): Observable<any> {
  //   const headers = this.getHeaders();
  //   const params = new HttpParams().set('userId', userId.toString());
  //   return this.http.get(`${this.apiUrl}/profile`, { headers, params });
  // }



  updatePassword(userId: number, newPassword: string): Observable<any> {
    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('newPassword', newPassword);
    return this.http.put(`${this.apiUrl}/update-password`, null, { headers, params });
  }

updateProfilePicture(userId: number, profilePicture: File): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('profilePicture', profilePicture);
    return this.http.put(`${this.apiUrl}/update-profile-picture`, formData, { headers: this.getHeaders() });
  }



}















