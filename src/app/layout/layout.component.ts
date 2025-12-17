import { Component, computed, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html',
})

export class LayoutComponent {
  isDropdownOpen = false;
  isInventoryOpen = false;

  user = computed(() => this.authService.currentUser());

  constructor(private authService: AuthService, private router: Router) {}
 
  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goProfile() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleInventoryMenu(){
    this.isInventoryOpen = !this.isInventoryOpen;
  }

}
