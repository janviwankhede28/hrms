// src/app/components/user-payslip/user-payslip.component.ts
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PayslipService } from '../../services/payslip.service';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-payslip',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent {
  salaryRecords: any[] = [];
  userEmail: string = '';  // logged-in user's email

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userEmail = payload.sub;  // assuming JWT `sub` contains email
    }

    // Load slips for this user
    this.http.get<any[]>(`http://localhost:8080/api/salary/email/${this.userEmail}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    }).subscribe((data: any[]) => {
      this.salaryRecords = data;
    });
  }

  downloadSlip(id: number) {
    this.http.get(`http://localhost:8080/api/salary/id/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'blob'
    }).subscribe((blob: Blob | MediaSource) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SalarySlip.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    }, () => {
      
    });
  }
}
