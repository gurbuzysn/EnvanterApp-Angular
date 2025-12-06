import { Component, OnInit } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { AddCategoryModalComponent } from './add-category/add-category.component';
import { CategoryService } from '../../../services/category.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IconField, InputIcon, AddCategoryModalComponent, TableModule, Image],
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  isAddCategoryModalVisible: boolean = false;
  categories: any[] = [];
  selectedCategory: any = null;

  constructor(private categoryService: CategoryService, private messageService: MessageService) {}
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.Result;
      },
      error: (error) => {
        let errorMessage = 'Bilinmeyen bir hata oluştu.';
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error.message) {
            errorMessage = error.error.message;
          } else if (error.error.Message) {
            errorMessage = error.error.Message;
          } else if (error.error.errors) {
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
    });
  }

  openAddCategoryModal() {
    this.isAddCategoryModalVisible = true;
  }

  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: `${response.Message}`,
        });
        this.loadCategories();
      },error: (error) => {
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
    });
  }

  updateCategory(category: any) {
    this.selectedCategory = category;
    this.isAddCategoryModalVisible = true;
  }
}
