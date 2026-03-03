import { Routes } from '@angular/router';
import { EmployeeListComponent } from './list/list.component';

export const EmployeeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: EmployeeListComponent,
        data: {
          title: 'Personel Yönetimi',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Personel Listesi' },
          ],
        },
      },
    ],
  },
];
