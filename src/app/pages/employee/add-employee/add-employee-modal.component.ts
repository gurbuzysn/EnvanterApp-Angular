import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
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
export class AddEmployeeModalComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() employeeToEdit?: Employee;
  @Output() employeeSaved = new EventEmitter<void>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeToEdit'] && this.employeeToEdit) {
      this.form.patchValue(this.employeeToEdit);
      this.previewUrl = this.employeeToEdit.ProfileImage
        ? 'data:image/jpeg;base64,' + this.employeeToEdit.ProfileImage
        : null;
    } else if (!this.employeeToEdit) {
      this.form.reset();
      this.previewUrl = null;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Form geçersiz');
      return;
    }

    const employee: Employee = this.form.value;
    if (this.employeeToEdit) {
      // 🔹 GÜNCELLEME
      this.employeeService.updateEmployee(this.employeeToEdit.Id, employee).subscribe({
        next: (res) => {
          alert('Çalışan başarıyla güncellendi');
          this.employeeSaved.emit();
          this.onHide();
        },
        error: (err) => console.error(err),
      });
    } else {
      // 🔹 EKLEME
      this.employeeService.addEmployee(employee).subscribe({
        next: (res) => {
          alert('Çalışan başarıyla eklendi');
          this.employeeSaved.emit();
          this.onHide();
        },
        error: (err) => console.error(err),
      });
    }
  }

  onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.employeeToEdit = undefined;
    this.form.reset();
    this.previewUrl = null;
  }

  onFileSelected(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.form.patchValue({ ProfileImage: file });
      this.form.get('ProfileImage')?.updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }
}
