import { NgClass, NgIf } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, NgClass, RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  sidebarOpen: boolean = false;
  searchQuery: string = '';

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  clearSearch() {
    this.searchQuery = '';
  }
}
