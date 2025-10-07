import { Component } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [InputTextModule, IconFieldModule, InputIconModule, CommonModule],
    templateUrl: './employee.component.html'

})

export class EmployeeComponent{
searchText: string = '';


     employees = [
    { name: 'Yasin Gürbüz', email: 'yasin@example.com', phone: '0500 111 22 33', department: 'IT' },
    { name: 'Ayşe Demir', email: 'ayse@example.com', phone: '0500 444 55 66', department: 'Muhasebe' },
    { name: 'Ali Kaya', email: 'ali@example.com', phone: '0500 999 88 77', department: 'İnsan Kaynakları' },
  ];

     filteredEmployees() {
    if (!this.searchText) return this.employees;
    return this.employees.filter(e =>
      e.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}