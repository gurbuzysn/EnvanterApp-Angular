import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},

    {path: '', component: LayoutComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'employee', component: EmployeeComponent},
        {path: 'inventory', component: InventoryComponent},
        {path: 'assignment', component: AssignmentComponent},
    ]},

    {path: '**', redirectTo: 'login'}
];
