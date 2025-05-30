// src/app/components/payslip/payslip.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payslip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent {
  empId!: number;
  month!: string;
  slip: any = null;
  error: string = '';

  constructor(private http: HttpClient) {}

  fetchPayslip() {
    if (!this.empId || !this.month) {
      this.error = 'Please enter Employee ID and Month.';
      return;
    }

    this.http.get<any>(`http://localhost:8080/api/salary/slip/${this.empId}/${this.month}`)
      .subscribe({
        next: (data) => {
          this.slip = data;
          this.error = '';
        },
        error: () => {
          this.error = 'Payslip not found or error occurred.';
          this.slip = null;
        }
      });
  }
}
