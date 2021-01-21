import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PostRequest } from '../models/post-request.model';
import { PostResponse } from '../models/post-response.model';
import { CommentRequest } from '../models/comment-request.model';
import { CommentResponse } from '../models/comment-response.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  onPublishPostEvent = new EventEmitter<boolean>();
  onUpdatePostEvent = new EventEmitter<boolean>();
  onFetchCommentsEvent = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private POST_URL = 'http://localhost:8080/api/posts';

  fetchAllPost(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.POST_URL);
  }

  fetchPostById(postId: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.POST_URL + '/' + postId);
  }

  fetchCommentsByPostId(postId: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(
      `${this.POST_URL}/${postId}/comments`,
      {}
    );
  }

  publish(postRequest: PostRequest): Observable<PostResponse> {
    return this.http.post<PostResponse>(this.POST_URL, postRequest);
  }

  commentPost(postId: number, request: CommentRequest): Observable<any> {
    return this.http.post(`${this.POST_URL}/${postId}/comments`, request);
  }

  checkPermiss(postId: number): Observable<any> {
    return this.http.post(`${this.POST_URL}/${postId}/checkpermission`, {});
  }

  updatePost(
    postId: number,
    postRequest: PostRequest
  ): Observable<PostResponse> {
    return this.http.put<PostResponse>(
      this.POST_URL + '/' + postId,
      postRequest
    );
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.POST_URL}/${postId}`);
  }
}
