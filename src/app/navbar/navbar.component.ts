import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

 constructor(private router: Router) {} 

ngOnInit() {
  if (typeof window !== 'undefined') {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.role = userData?.role || 'Role';
    this.username = userData?.name || 'User';
    console.log(userData.role);
  }
}


logout() {
  if (typeof window !== 'undefined') {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

}
