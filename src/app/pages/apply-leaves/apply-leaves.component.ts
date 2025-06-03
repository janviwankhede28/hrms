import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apply-leaves',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css'] 
})
export class ApplyLeavesComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  leaveForm = this.fb.group({
    employeeId: ['', Validators.required],
    leaveType: ['', Validators.required],
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required],
    reason: ['', Validators.required]
  });

  leaves: any[] = [];

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // or sessionStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
  }

  constructor() {
    this.getAllLeaves();
  }

  createLeave() {
    if (this.leaveForm.valid) {
      this.http.post('http://localhost:8080/api/leaves/createLeave', this.leaveForm.value, {
        headers: this.getAuthHeaders()
      }).subscribe(() => {
        this.leaveForm.reset();
        this.getAllLeaves();
      }, error => {
        console.error('Error creating leave:', error);
      });
    }
  }

  getAllLeaves() {
    this.http.get<any[]>('http://localhost:8080/api/leaves/getAllLeaves', {
      headers: this.getAuthHeaders()
    }).subscribe(data => this.leaves = data, error => {
      console.error('Error fetching leaves:', error);
    });
  }

  updateStatus(id: number, status: string) {
    this.http.put(`http://localhost:8080/api/leaves/updateStatusById/${id}/status?status=${status}`, {}, {
      headers: this.getAuthHeaders()
    }).subscribe(() => this.getAllLeaves(), error => {
      console.error('Error updating status:', error);
    });
  }

  deleteLeave(id: number) {
    this.http.delete(`http://localhost:8080/api/leaves/DeleteLeaveById/${id}`, {
      headers: this.getAuthHeaders()
    }).subscribe(() => this.getAllLeaves(), error => {
      console.error('Error deleting leave:', error);
    });
  }

  // Add this method for confirmation before delete
  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this leave request?')) {
      this.deleteLeave(id);
    }
  }
}
