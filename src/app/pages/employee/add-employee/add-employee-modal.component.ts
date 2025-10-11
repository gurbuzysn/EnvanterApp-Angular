import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { CommonModule } from '@angular/common';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { FileSelectEvent, FileUploadModule } from "primeng/fileupload";



@Component({
    selector: 'app-add-employee-modal',
    standalone: true,
    imports: [DialogModule, CommonModule, InputTextModule, ButtonModule, FileUploadModule],
    templateUrl: './add-employee-modal.component.html'
})

export class AddEmployeeModalComponent{
    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();

previewUrl: string | ArrayBuffer | null = null;

exampleForm: any;

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