import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../../../services/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-category-modal',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, FormsModule, FileUploadModule],
  templateUrl: './add-category.component.html',
})
export class AddCategoryModalComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() category: any = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() categoryAdded = new EventEmitter<void>();

  categoryName: string = '';
  categoryImage: File | null = null;

  constructor(private categoryService: CategoryService, private messageService: MessageService) {}

  onImageSelect(event: any) {
    this.categoryImage = event.files[0];
  }

  addCategory() {
    if (this.category) {
      this.categoryService
        .updateCategory(this.category.Id, this.categoryName, this.categoryImage)
        .subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: `Kategori başarıyla güncellendi.`,
            });
            this.categoryAdded.emit();
            this.visibleChange.emit(false);
          },
          (err) => {
            let errorMessage = 'Bilinmeyen bir hata oluştu.';
            if (err.error) {
              if (typeof err.error === 'string') {
                errorMessage = err.error;
              } else if (err.error.message) {
                errorMessage = err.error.message;
              } else if (err.error.Message) {
                errorMessage = err.error.Message;
              } else if (err.error.errors) {
                errorMessage = Object.values(err.error.errors).flat().join('\n');
              }
            } else if (err.message) {
              errorMessage = err.message;
            }

            this.messageService.add({
              severity: 'error',
              summary: 'Giriş Hatası',
              detail: errorMessage,
            });
          }
        );
    } else {
      this.categoryService.addCategory(this.categoryName, this.categoryImage).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: `${response.Message}`,
          });
          this.categoryAdded.emit();
          this.visibleChange.emit(false);
        },

        (err) => {
          let errorMessage = 'Bilinmeyen bir hata oluştu.';
          if (err.error) {
            if (typeof err.error === 'string') {
              errorMessage = err.error;
            } else if (err.error.message) {
              errorMessage = err.error.message;
            } else if (err.error.Message) {
              errorMessage = err.error.Message;
            } else if (err.error.errors) {
              errorMessage = Object.values(err.error.errors).flat().join('\n');
            }
          } else if (err.message) {
            errorMessage = err.message;
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Giriş Hatası',
            detail: errorMessage,
          });
        }
      );
    }
  }
  ngOnChanges() {
    if (this.category) {
      this.categoryName = this.category.Name;
      this.categoryImage = null;
    } else {
      this.categoryName = '';
      this.categoryImage = null;
    }
  }
}
