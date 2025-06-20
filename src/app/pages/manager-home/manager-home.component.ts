import { HolidayService } from './../../../services/holidays.service';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from './../../../services/attendance.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manager-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-home.component.html',
  styleUrl: './manager-home.component.css',
})
export class ManagerHomeComponent implements OnInit, OnDestroy {
  [x: string]: any;
  remarks: any;
  timeString: string = '';
  isSignedIn: boolean = false;
  holidays: any[] = []; // without interface

  attendanceData = {
    employeeId:
      JSON.parse(localStorage.getItem('userData') || '{}').EmployeeId || '',
    location: '',
    remarks: '',
  };

  private intervalId: any;

  constructor(
    private http: HttpClient,
    private AttendanceService: AttendanceService,
    private holidayService: HolidayService
  ) {}

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    this.getHolidays();
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
          const modal =
            (window as any).bootstrap.Modal.getInstance(modalElement) ||
            new (window as any).bootstrap.Modal(modalElement);
          modal.hide();
        }
      },
      error: (err) => {
        console.error('Error during sign-in:', err);
      },
    });
  }

  signOut() {
    this.AttendanceService.signOut(this.attendanceData.employeeId).subscribe({
      next: (res) => {
        console.log('Sign-out successful:', res);
        this.isSignedIn = false;

        // Close modal manually
        const modalElement = document.getElementById('workLocationModal');
        if (modalElement) {
          // @ts-ignore
          const modal =
            (window as any).bootstrap.Modal.getInstance(modalElement) ||
            new (window as any).bootstrap.Modal(modalElement);
          modal.hide();
        }
      },
      error: (err) => {
        console.error('Error during sign-out:', err);
      },
    });
  }

  //! getholidays method for manager home component

  getHolidays() {
    this.holidayService.getHolidays().subscribe({
      next: (data) => {
        this.holidays = data;
      },
      error: (err) => {
        console.error('Error fetching holidays', err);
      },
    });
  }
}
