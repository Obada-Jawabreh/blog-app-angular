import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './../../api.service';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    fullName: string;
  };
  reactions: {
    user: string;
    type: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blogs.component.html',
})
export class BlogsComponent implements OnInit {
  posts: Post[] = [];
  newPost = { title: '', content: '' };
  newComment: { [key: string]: string } = {};
  newReply: { [key: string]: string } = {};
  comments: { [key: string]: any[] } = {};
  showComments: { [key: string]: boolean } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.apiService.getPosts().subscribe({
      next: (response: Post[]) => {
        this.posts = response;
        this.posts.forEach((post) => {
          this.showComments[post._id] = false;
          this.getComments(post._id);
        });
      },
      error: (error) => {
        console.error('Error fetching posts', error);
      },
    });
  }

  createPost() {
    this.apiService.addPost(this.newPost).subscribe({
      next: (response) => {
        console.log('Post created', response);
        this.getPosts();
        this.newPost = { title: '', content: '' };
      },
      error: (error) => {
        console.error('Error creating post', error);
      },
    });
  }

  addReaction(postId: string, type: string) {
    this.apiService.addReaction(postId, { type }).subscribe({
      next: (response) => {
        console.log('Reaction added', response);
        this.getPosts();
      },
      error: (error) => {
        console.error('Error adding reaction', error);
      },
    });
  }

  toggleComments(postId: string) {
    this.showComments[postId] = !this.showComments[postId];
  }

  getComments(postId: string) {
    this.apiService.getComments(postId).subscribe({
      next: (response) => {
        this.comments[postId] = response;
      },
      error: (error) => {
        console.error('Error fetching comments', error);
      },
    });
  }

  addComment(postId: string) {
    this.apiService
      .addComment(postId, { content: this.newComment[postId] })
      .subscribe({
        next: (response) => {
          console.log('Comment added', response);
          this.getComments(postId);
          this.newComment[postId] = '';
        },
        error: (error) => {
          console.error('Error adding comment', error);
        },
      });
  }

  addReply(postId: string, commentId: string) {
    this.apiService
      .addReply(postId, commentId, { content: this.newReply[commentId] })
      .subscribe({
        next: (response) => {
          console.log('Reply added', response);
          this.getComments(postId);
          this.newReply[commentId] = '';
        },
        error: (error) => {
          console.error('Error adding reply', error);
        },
      });
  }

  getReactionCount(post: Post, type: string): number {
    return post.reactions.filter(reaction => reaction.type === type).length;
  }
}
