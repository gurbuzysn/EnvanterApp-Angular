import { Component } from "@angular/core";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { AddCategoryModalComponent } from "./add-category/add-category.component";

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [IconField, InputIcon, AddCategoryModalComponent],
    templateUrl: './category.component.html'
})

export class CategoryComponent{
    isAddCategoryModalVisible: boolean = false;

    openAddCategoryModal(){
        this.isAddCategoryModalVisible = true;
    }
}