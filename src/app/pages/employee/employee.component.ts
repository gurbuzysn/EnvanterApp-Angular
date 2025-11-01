import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../../services/employee.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AddEmployeeModalComponent } from './add-employee/add-employee-modal.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    AddEmployeeModalComponent,
  ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {
  searchText: string = '';
  employees: Employee[] = [];
  visible: boolean = false;
  selectedEmployee?: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
  this.loadEmployees();
}

  filteredEmployees() {
    if (!this.searchText) return this.employees;
    return this.employees.filter((e) =>
      e.FirstName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  showDialog() {
    this.selectedEmployee = undefined;
    this.visible = true;
  }


  loadEmployees() {
  this.employeeService.getAllEmployees().subscribe({
    next: (data: any) => {
      this.employees = data.Result;
    },
    error: (err) => console.error('Hata:', err),
  });
}


  removeEmployee(id: string) {
    this.employeeService.removeEmployee(id).subscribe({
      next: (data: any) => {
        this.loadEmployees();
        alert(data.Message);
      },
    });
  }

  updateEmployee(employee: Employee) {

  this.selectedEmployee = { ...employee };
    this.visible = true;
  }
}
