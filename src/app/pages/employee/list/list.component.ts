import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {
  MatTableDataSource,
  MatTable,
  MatTableModule,
} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/services/models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    TablerIconsModule,
    NgScrollbarModule,
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class EmployeeListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  displayedColumns: string[] = [
    '#',
    'name',
    'email',
    'phone',
    'department',
    'title',
  ];
  dataSource = new MatTableDataSource<Employee>([]);
  isLoading = false;
  searchText: string = '';

  constructor(
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Personel verileri yüklenirken hata oluştu:', error);
        this.isLoading = false;
      },
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFullName(employee: Employee): string {
    return `${employee.FirstName} ${employee.LastName}`;
  }
}
