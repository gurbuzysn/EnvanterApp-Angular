import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
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
    // Güncelleme modunda
    this.categoryService
      .updateCategory(this.category.Id, this.categoryName, this.categoryImage)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: `Kategori başarıyla güncellendi.`
          });
          this.categoryAdded.emit();
          this.visibleChange.emit(false);
        },
        (error) => {
        let errorMessage = 'Bilinmeyen bir hata oluştu.';
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error.message) {
            errorMessage = error.error.message;
          }
          else if(error.error.Message){
            errorMessage = error.error.Message;
          }
          else if (error.error.errors) {
            errorMessage = Object.values(error.error.errors).flat().join('\n');
          }
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Giriş Hatası',
          detail: errorMessage,
        });
      },
      );
  } else {
    // Ekleme modunda
    this.categoryService
      .addCategory(this.categoryName, this.categoryImage)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: `${response.Message}`
          });
          this.categoryAdded.emit();
          this.visibleChange.emit(false);
        },
        (_) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Kategori eklenirken hata oluştu.'
          });
        }
      );
  }
}
  ngOnChanges(){
    if(this.category){
      this.categoryName = this.category.Name;
      this.categoryImage = null;
    }
    else{
      this.categoryName = '';
      this.categoryImage = null;
    }
  }

}
