import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Dialog } from "primeng/dialog";

@Component({
    selector: 'app-add-category-modal',
    standalone: true,
    imports: [Dialog],
    templateUrl: './add-category.component.html'
})

export class AddCategoryModalComponent {

    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<string>();
}