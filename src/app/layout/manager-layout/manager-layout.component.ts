import { Component } from '@angular/core';
import { ManagerSidebarComponent } from "../../sidebars/manager-sidebar/manager-sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager-layout',
  standalone: true,
  imports: [ManagerSidebarComponent,RouterOutlet],
  templateUrl: './manager-layout.component.html',
  styleUrl: './manager-layout.component.css'
})
export class ManagerLayoutComponent {

}
