import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms'; // ✅ Required for ngModel
import { AddEmployeeService } from '../../../services/add-employee.service';
 
=======
import { FormsModule } from '@angular/forms';
import { AddEmployeeService } from '../../../services/add-employee.service';

>>>>>>> 762c70c3a4866be974182d3eec56a76e87122741
@Component({
  selector: 'app-people-directory',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './user-people.component.html',
  styleUrl: './user-people.component.css',
})
export class UserPeopleComponent implements OnInit {
  employees: any[] = [];
  starredEmployees: any[] = []; // Add your logic to populate this list
<<<<<<< HEAD
 
  defaultProfile: string = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
  activeTab: string = 'starred';
 
  selectedEmployee: any = null;
 
  searchTerm: string = '';
  starredSearchTerm: string = '';
 
  constructor(private addEmployeeService: AddEmployeeService) {}
 
  ngOnInit(): void {
    this.getAllEmployees();
  }
 
=======

  defaultProfile: string = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
  activeTab: string = 'starred';

  selectedEmployee: any = null;

  searchTerm: string = '';
  starredSearchTerm: string = '';

  constructor(private addEmployeeService: AddEmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

>>>>>>> 762c70c3a4866be974182d3eec56a76e87122741
  getAllEmployees() {
    this.addEmployeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        // Dummy logic to populate starredEmployees – replace with your logic
        this.starredEmployees = res.filter((emp: any) => emp.isStarred);
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }
<<<<<<< HEAD
 
=======

>>>>>>> 762c70c3a4866be974182d3eec56a76e87122741
  filteredEmployees() {
    return this.employees.filter(emp =>
      (`${emp.firstName} ${emp.lastName}`).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
<<<<<<< HEAD
 
=======

>>>>>>> 762c70c3a4866be974182d3eec56a76e87122741
  filteredStarredEmployees() {
    return this.starredEmployees.filter(emp =>
      (`${emp.firstName} ${emp.lastName}`).toLowerCase().includes(this.starredSearchTerm.toLowerCase())
    );
  }
<<<<<<< HEAD
 
=======

>>>>>>> 762c70c3a4866be974182d3eec56a76e87122741
  selectEmployee(emp: any) {
    this.selectedEmployee = emp;
  }
}
<<<<<<< HEAD
 
=======

>>>>>>> 762c70c3a4866be974182d3eec56a76e87122741
