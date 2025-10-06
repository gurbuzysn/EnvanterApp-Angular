import { Component } from "@angular/core";
import { InputText } from "primeng/inputtext";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";

@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [InputText, IconFieldModule, InputIconModule],
    templateUrl: './employee.component.html'

})

export class EmployeeComponent{

}