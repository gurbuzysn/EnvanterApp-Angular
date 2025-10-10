import { Component } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { CommonModule } from "@angular/common";
import { Employee, EmployeeService } from "../../services/employee.service";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AddEmployeeModalComponent } from "./add-employee-modal.component";


@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [InputTextModule, IconFieldModule, InputIconModule, CommonModule, DialogModule, ButtonModule, AddEmployeeModalComponent],
    templateUrl: './employee.component.html'
})

export class EmployeeComponent{
searchText: string = '';
employees: Employee[] = [];
visible: boolean = false;

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


showDialog() {
  this.visible = true;
}





}