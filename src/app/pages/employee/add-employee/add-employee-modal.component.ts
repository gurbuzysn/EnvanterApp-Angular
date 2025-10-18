import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee, EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-add-employee-modal',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-employee-modal.component.html',
})
export class AddEmployeeModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  previewUrl: string | ArrayBuffer | null = null;
  exampleForm: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.form = this.fb.group({
      FirstName: [null],
      LastName: [null],
      Email: [null],
      PhoneNumber: [null],
      Department: [null],
      Title: [null],
      ProfileImage: [null as File | null],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Form geçersiz');
      return;
    }

    const employee: Employee = this.form.value;

    this.employeeService.addEmployee(employee).subscribe({
      next: (res) => {},
      error: (err) => {},
    });
  }

  onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onFileSelected(file: File) {
    alert('onFileSelected tetiklendi: ' + file.name);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.form.patchValue({ ProfileImage: file });
      this.form.get('ProfileImage')?.updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  }
}
