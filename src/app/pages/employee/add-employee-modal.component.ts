import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { CommonModule } from '@angular/common';
import { InputTextModule } from "primeng/inputtext";



@Component({
    selector: 'app-add-employee-modal',
    standalone: true,
    imports: [DialogModule, CommonModule, InputTextModule],
    templateUrl: './add-employee-modal.component.html'
})

export class AddEmployeeModalComponent{
    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();
exampleForm: any;

    onHide() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}