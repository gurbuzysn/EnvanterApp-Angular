import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add-category-modal',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, FormsModule, FileUploadModule],
  templateUrl: './add-category.component.html',
})
export class AddCategoryModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  categoryName: string = '';
  categoryImage: File | null = null;

  constructor(private categoryService: CategoryService) {}

  onImageSelect(event: any) {
    this.categoryImage = event.files[0];
  }

  addCategory() {
    console.log('Kategori Adı:', this.categoryName);
    console.log('Seçilen Fotoğraf:', this.categoryImage);

    this.categoryService.addCategory(this.categoryName, this.categoryImage).subscribe(
      (response) => {
        console.log('Kategori başarıyla eklendi:', response);
        this.visibleChange.emit(false);
      },
      (error) => {
        console.error('Kategori eklenirken hata oluştu:', error);
      }
    );

    this.visibleChange.emit(false);
  }
}
