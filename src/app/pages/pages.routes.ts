import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { EmployeeRoutes } from './employee/employee.route';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'employees',
    children: EmployeeRoutes,
  },
];
