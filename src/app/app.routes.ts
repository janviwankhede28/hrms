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
import { AuthGuard } from './guards/auth.guard';

import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';

import { HomeComponent } from './pages/home/home.component';
import { EngageComponent } from './pages/engage/engage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔐 Dashboard routes with AuthGuard
  // { path: 'dashboard/user', component: UserDashboardComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  // { path: 'dashboard/hr', component: HrDashboardComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
     { path: 'dashboard/manager', component: ManagerLayoutComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
  // { path: 'dashboard/seniorhr', component: SeniorhrDashboardComponent, canActivate: [AuthGuard], data: { role: 'SENIORHR' } },

     //! 📌 Layout Route for Sidebar + Tabs
    { path: '', component: ManagerLayoutComponent, children: [
      //? Example: Add more sidebar tab routes here
      { path: 'home', component: HomeComponent , canActivate: [AuthGuard],},
      { path: 'engage', component: EngageComponent, canActivate: [AuthGuard], },
      // { path: 'todo/tasks', component: TasksComponent },
      // { path: 'todo/reminders', component: RemindersComponent },
    ]
  },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' },
];

