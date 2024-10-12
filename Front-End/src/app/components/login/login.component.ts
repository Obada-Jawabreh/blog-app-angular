import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    this.apiService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/blogs']);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed: ' + error.error.message);
        },
      });
  }
}
