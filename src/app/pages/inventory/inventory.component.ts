import { Component } from "@angular/core";
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-inventory',
    standalone: true,
    imports: [InputTextModule],
    templateUrl: './inventory.component.html'
})

export class InventoryComponent{

}