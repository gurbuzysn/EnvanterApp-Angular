import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';

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
    seledctedImage: File | null = null;

    onImageSelect(event: any){
        this.seledctedImage = event.files[0];
    }

  addCategory() {

console.log("Kategori Adı:", this.categoryName);
    console.log("Seçilen Fotoğraf:", this.seledctedImage);
    alert("addCategory Çalıştı");



    this.visibleChange.emit(false);
  }

}
