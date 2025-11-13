 import { Component } from "@angular/core";
import { RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterLink, RouterOutlet, RouterLinkActive],
    templateUrl: './layout.component.html'
})

export class LayoutComponent{
    personelSettings(){
        alert("Personel Ayarları");
    }

}