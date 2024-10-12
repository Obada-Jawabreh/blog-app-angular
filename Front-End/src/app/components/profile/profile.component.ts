import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './../../api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.apiService.getUserData().subscribe({
      next: (response) => {
        this.userData = response.user;
        this.userData.posts = response.posts;
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      }
    });
  }
}
