import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from './../../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;
  isMenuOpen: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.isLoggedIn$ = this.apiService.isLoggedIn$;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.apiService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']);
        this.isMenuOpen = false;
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }

  login() {
    this.router.navigate(['/login']);
    this.isMenuOpen = false;
  }
}
