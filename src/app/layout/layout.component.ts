import { Component } from "@angular/core";
import { RouterLink } from "../../../node_modules/@angular/router/router_module.d";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './layout.component.html'
})

export class LayoutComponent{

}