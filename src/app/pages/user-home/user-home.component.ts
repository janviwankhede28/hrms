import { Component, OnInit, OnDestroy } from '@angular/core';
import { AttendanceService } from './../../../services/attendance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})

export class UserHomeComponent implements OnInit, OnDestroy {
[x: string]: any;
remarks: any;
signOut() {
throw new Error('Method not implemented.');
}

  isSignedIn: boolean = false;

  attendanceData = {
    employeeId: JSON.parse(localStorage.getItem('userData') || '{}').EmployeeId || '',
    location: '',
    remarks: ''
  };

  timeString: string = '';
  private intervalId: any;

  constructor(private AttendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  updateTime(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.timeString = `${hours} : ${minutes} : ${seconds}`;
  }



 signIn() {
    if (!this.attendanceData.location) return;

    this.AttendanceService.signIn(this.attendanceData).subscribe({
      next: (res) => {
        console.log('Sign-in successful:', res);
        this.isSignedIn = true;

        // Close modal manually
        const modalElement = document.getElementById('workLocationModal');
        if (modalElement) {
          // @ts-ignore
          const modal = (window as any).bootstrap.Modal.getInstance(modalElement) || new (window as any).bootstrap.Modal(modalElement);
          modal.hide();
        }
      },
      error: (err) => {

        console.error('Error during sign-in:', err);
      }
    });
  }



}










