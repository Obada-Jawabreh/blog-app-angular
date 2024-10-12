import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkInitialAuthState();
  }

  private checkInitialAuthState() {
    this.getUserData().subscribe({
      next: () => this.isLoggedInSubject.next(true),
      error: () => this.isLoggedInSubject.next(false)
    });
  }

  // User
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, credentials, { withCredentials: true })
      .pipe(
        tap(() => this.isLoggedInSubject.next(true))
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.isLoggedInSubject.next(false))
      );
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/get`, { withCredentials: true });
  }

  // Post
  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/get`, { withCredentials: true });
  }

  addPost(postData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/add`, postData, { withCredentials: true });
  }

  addReaction(postId: string, reactionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/${postId}`, reactionData, { withCredentials: true });
  }

  // Comment
  getComments(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/comment/posts/${postId}/comments`);
  }

  addComment(postId: string, commentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comment/${postId}/comments`, commentData, { withCredentials: true });
  }

  addReply(postId: string, commentId: string, replyData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comment/${postId}/comments/${commentId}/reply`, replyData, { withCredentials: true });
  }
}
