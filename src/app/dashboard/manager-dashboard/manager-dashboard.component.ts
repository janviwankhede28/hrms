import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {

  // Signal for sidebar expanded/collapsed
  isExpanded = signal(true);

  // Submenu tracker
  expandedMenus: Set<string> = new Set();

  // Toggle Sidebar
  toggleSidebar(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  // Toggle Submenu
  toggleSubmenu(label: string): void {
    this.expandedMenus.has(label)
      ? this.expandedMenus.delete(label)
      : this.expandedMenus.add(label);
  }

  // Check if submenu is expanded
  isSubmenuExpanded(label: string): boolean {
    return this.expandedMenus.has(label);
  }
}
