import { Component, OnInit } from "@angular/core";
import { CardModule } from 'primeng/card'
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
   selector: 'app-dashboard',
   standalone: true,
   imports: [CardModule, ToastModule],
   templateUrl: './dashboard.component.html' 
})

export class DashboardComponent implements OnInit {

   constructor(private messageService: MessageService){}

   ngOnInit(){
      this.messageService.add({severity:'info', summary: 'Hoşgeldiniz', detail: 'Anasayfaya giriş yaptınız.'});
   }
}