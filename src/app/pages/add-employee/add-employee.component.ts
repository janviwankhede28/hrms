import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddEmployeeService } from '../../../services/add-employee.service';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  employees: any[] = [];
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  registerForm!: FormGroup;

  selectedFile: File | null = null;
  selectedImage: File | null = null;
  selectedEmployeeId!: number;

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private addEmployeeService: AddEmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      department: [''],
      jobTitle: [''],
      role: ['', Validators.required],
      status: ['', Validators.required],
      joiningDate: ['', Validators.required],
      exitDate: [''],
    });

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      department: [''],
      jobTitle: [''],
      role: ['', Validators.required],
      status: ['', Validators.required],
      joiningDate: ['', Validators.required],
      exitDate: [''],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });

    this.getEmployees();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  getEmployees() {
    this.addEmployeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
      },
      error: (err) => {
        console.error('❌ Error fetching employees:', err);
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    const formData = new FormData();
    const employeeData = JSON.stringify(this.employeeForm.value);
    formData.append('employeeData', employeeData);
    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    this.addEmployeeService.addEmployeeWithImage(formData).subscribe({
      next: () => {
        (document.getElementById('closeModalBtn') as HTMLElement)?.click();
        this.toastr.success('Employee added successfully!', 'Success');
        this.employeeForm.reset();
        this.selectedFile = null;
        this.getEmployees();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  //! ======================== Edit =========================

  openEditModal(emp: any) {
    if (!emp) return;

    this.selectedEmployeeId = emp.id;

    this.editForm.patchValue({
      firstName: emp.firstName || '',
      lastName: emp.lastName || '',
      email: emp.email || '',
      phone: emp.phone || '',
      department: emp.department || '',
      jobTitle: emp.jobTitle || '',
      role: emp.role || '',
      status: emp.status || '',
      joiningDate: emp.joiningDate || '',
      exitDate: emp.exitDate || '',
    });

    const modalEl = document.getElementById('editEmployeeModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      console.error('❌ Edit modal not found in DOM');
    }
  }

  onEditSubmit() {
    if (this.editForm.invalid) return;

    this.addEmployeeService
      .updateEmployeeWithImage(this.selectedEmployeeId, this.editForm.value)
      .subscribe({
        next: () => {
          (
            document.getElementById('closeEditModalBtn') as HTMLElement
          )?.click();
          this.getEmployees();
          this.toastr.success('Employee updated successfully!', 'Success');
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  //! ======================== Register =========================

  openRegisterModal(emp: any) {
    if (!emp) return;

    this.selectedEmployeeId = emp.id;

    this.registerForm.reset({
      email: emp.email || '',
      password: '',
      role: emp.role || '',
    });

    const modalEl = document.getElementById('registerModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      console.error('❌ Register modal element not found!');
    }
  }

  onRegister() {
    if (!this.selectedEmployeeId) return;

    const registerFormValue = this.registerForm.value;
    const userData = {
      email: registerFormValue.email,
      password: registerFormValue.password,
      role: registerFormValue.role,
      employee: { id: this.selectedEmployeeId },
    };

    const formData = new FormData();
    formData.append('userData', JSON.stringify(userData));
    if (this.selectedImage) {
      formData.append('profilePicture', this.selectedImage);
    }

    this.addEmployeeService.registerEmployee(formData).subscribe({
      next: () => {
        (
          document.getElementById('closeRegisterModalBtn') as HTMLElement
        )?.click();
        this.selectedImage = null;
        this.toastr.success('Employee registered successfully!', 'Success');
        this.getEmployees();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  //! ======================== Delete =========================

  delete(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.addEmployeeService.deleteEmployee(id).subscribe(() => {
        this.toastr.success('Employee deleted successfully!', 'Success');
        this.getEmployees();
      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.selectedFile = null;
  }
}
