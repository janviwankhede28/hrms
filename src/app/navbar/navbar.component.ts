import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  role: string = '';
  username: string = 'User';

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = userData?.role || '';
    this.username = userData?.name || 'User';
  }

  logout() {
    localStorage.clear();
    // Navigate to login
  }
}
