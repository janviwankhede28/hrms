import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';

import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { HrDashboardComponent } from './dashboard/hr-dashboard/hr-dashboard.component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';
import { SeniorhrDashboardComponent } from './dashboard/seniorhr-dashboard/seniorhr-dashboard.component';
import { DashboardComponent } from './dashboards/dashboard.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'dashboards', component: DashboardComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard/user', component: UserDashboardComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  { path: 'dashboard/hr', component: HrDashboardComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
  { path: 'dashboard/manager', component: ManagerDashboardComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
  { path: 'dashboard/seniorhr', component: SeniorhrDashboardComponent, canActivate: [AuthGuard], data: { role: 'SENIORHR' } },
  { path: '**', redirectTo: 'login' },
];



