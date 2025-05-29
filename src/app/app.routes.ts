// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';

// import { AuthGuard } from './guards/auth.guard';

// import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
// import { HrDashboardComponent } from './dashboard/hr-dashboard/hr-dashboard.component';
// import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';
// import { SeniorhrDashboardComponent } from './dashboard/seniorhr-dashboard/seniorhr-dashboard.component';
// import { HomeComponent } from './home/home.component';


// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },

//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   { path: 'home', component: HomeComponent, },

//   { path: 'dashboard/user', component: UserDashboardComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
//   { path: 'dashboard/hr', component: HrDashboardComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
//   { path: 'dashboard/manager', component: ManagerDashboardComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
//   { path: 'dashboard/seniorhr', component: SeniorhrDashboardComponent, canActivate: [AuthGuard], data: { role: 'SENIORHR' } },
//   { path: '**', redirectTo: 'login' },
// ];





//? tesing routes

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../guards/auth.guard';

import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';

import { EngageComponent } from './pages/engage/engage.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { AllUserComponent } from './pages/all-user/all-user.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { HrLayoutComponent } from './layout/hr-layout/hr-layout.component';
import { SeniorHrLayoutComponent } from './layout/senior-hr-layout/senior-hr-layout.component';
import { ManagerHomeComponent } from './pages/manager-home/manager-home.component';
import { SeniorHrHomeComponent } from './pages/senior-hr-home/senior-hr-home.component';
import { HrHomeComponent } from './pages/hr-home/hr-home.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { SalarySummaryComponent } from './pages/salary-summary/salary-summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔐 Dashboard routes with AuthGuard
  { path: 'dashboard/manager', component: ManagerLayoutComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
  { path: 'dashboard/seniorhr', component: SeniorHrLayoutComponent, canActivate: [AuthGuard], data: { role: 'SENIORHR' } },
  { path: 'dashboard/hr', component: HrLayoutComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
  { path: 'dashboard/user', component: UserLayoutComponent, canActivate: [AuthGuard], data: { role: 'USER' } },

     //! 📌 Manager Layout Route for Sidebar + Tabs

  { path: '', component: ManagerLayoutComponent, children:
    [
      //? Example: Add more sidebar tab routes here
     { path: 'manager-home', component: ManagerHomeComponent , canActivate: [AuthGuard],},
     { path: 'manager-engage', component: EngageComponent, canActivate: [AuthGuard], },
     { path: 'manager-add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], },
     { path: 'manager-all-user', component: AllUserComponent, canActivate: [AuthGuard], },
    
    ]
  },

     //! 📌 Senior-Hr Layout Route for Sidebar + Tabs

  { path: '', component: SeniorHrLayoutComponent, children:
    [
      //? Example: Add more sidebar tab routes here
     { path: 'senior-hr-home', component: SeniorHrHomeComponent , canActivate: [AuthGuard],},
     { path: 'senior-hr-add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], },
     { path: 'senior-hr-all-user', component: AllUserComponent, canActivate: [AuthGuard], },
     { path: 'senior-hr-engage', component: EngageComponent, canActivate: [AuthGuard], },
    ]
  },
     //! 📌 Hr Layout Route for Sidebar + Tabs

  { path: '', component: HrLayoutComponent, children:
    [
      //? Example: Add more sidebar tab routes here
     { path: 'hr-home', component: HrHomeComponent , canActivate: [AuthGuard],},
     { path: 'hr-add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], },
     { path: 'hr-all-user', component: AllUserComponent, canActivate: [AuthGuard], },
     { path: 'hr-engage', component: EngageComponent, canActivate: [AuthGuard], },
    ]
  },
     //! 📌 User Layout Route for Sidebar + Tabs

  { path: '', component: UserLayoutComponent, children:
    [
      //? Example: Add more sidebar tab routes here
     { path: 'user-home', component: UserHomeComponent , canActivate: [AuthGuard],},
     { path: 'salary', component: SalarySummaryComponent, canActivate: [AuthGuard], },
    //  { path: 'user-add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], },
    //  { path: 'user-all-user', component: AllUserComponent, canActivate: [AuthGuard], },
    ]
  },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' },
];

