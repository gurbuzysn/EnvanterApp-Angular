import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
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
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required],
      Department: ['', Validators.required],
      Position: ['', Validators.required],
    });
  }

  onSubmit() {

    if(this.form.invalid){
      this.form.markAllAsTouched();

      alert("Form geçersiz");

      return;
    }


    const employee: Employee = this.form.value;


    this.employeeService.addEmployee(employee).subscribe({
      next: (res) => {
        alert("Burada Çalışan başarıyla kaydedildi diyecek. ve tamamdan sonra modal kapacak ve form sıfırlanacak")
        
      },





error: (err) => {
  console.error('Hata Detayları:', err);

  let errorMessage = 'Bilinmeyen bir hata oluştu.';

  if (err.status === 400 && err.error?.errors) {
    // Validation hatalarını topla
    const validationErrors = err.error.errors;
    const messages = Object.keys(validationErrors)
      .map(key => `${key}: ${validationErrors[key].join(', ')}`)
      .join('\n');

    errorMessage = messages;
  } 
  else if (err.status >= 500) {
    errorMessage = 'Sunucuda bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  } 
  else if (err.status === 0) {
    errorMessage = 'Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.';
  }
  else {
    errorMessage = err.error?.detail || err.error?.message || err.statusText;
  }

  alert(`Hata (${err.status}):\n${errorMessage}`);
}










    })


  }

  onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onFileSelected(event: FileSelectEvent) {
    const file = event.files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.previewUrl = e.target.result);
      reader.readAsDataURL(file);
    }
  }
}
