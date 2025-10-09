import { Component } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { CommonModule } from "@angular/common";
import { Employee, EmployeeService } from "../../services/employee.service";

@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [InputTextModule, IconFieldModule, InputIconModule, CommonModule],
    templateUrl: './employee.component.html'
})

export class EmployeeComponent{
searchText: string = '';
employees: Employee[] = [];

constructor(private employeeService : EmployeeService){}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: any ) => {
        this.employees = data.result
        },
      error: (err) => console.error('Hata:', err)
    })
  }

     filteredEmployees() {
    if (!this.searchText) return this.employees;
    return this.employees.filter(e =>
      e.firstName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}