import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},

    {path: '', component: LayoutComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
    ]},

    {path: '**', redirectTo: 'login'}
];
