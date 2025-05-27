// add-employee.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddEmployeeService } from '../../../services/add-employee.service';

declare var bootstrap: any;

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employees: any[] = [];
  isEdit = false;

  constructor(private fb: FormBuilder, private AddEmployeeService: AddEmployeeService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      department: [''],
      jobTitle: [''],
      role: ['', Validators.required],
      joiningDate: ['', Validators.required],
      exitDate: [''],
      status: ['Active', Validators.required]
    });
    this.getEmployees();
  }

  getEmployees() {
    this.AddEmployeeService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }

  onSubmit() {
    const data = this.employeeForm.value;
    if (this.isEdit) {
      this.AddEmployeeService.updateEmployee(data.id, data).subscribe(() => {
        this.getEmployees();
        this.resetForm();
      });
    } else {
      this.AddEmployeeService.addEmployee(data).subscribe(() => {
        this.getEmployees();
        this.resetForm();
      });
    }
    (document.getElementById('closeModalBtn') as HTMLElement).click();
  }

  edit(emp: any) {
    this.employeeForm.patchValue(emp);
    this.isEdit = true;
    const modal = new bootstrap.Modal(document.getElementById('employeeModal')!);
    modal.show();
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.AddEmployeeService.deleteEmployee(id).subscribe(() => {
        this.getEmployees();
      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.isEdit = false;
  }
}
