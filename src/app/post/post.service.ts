import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PostRequest } from './post-request.payload';
import { PostResponse } from './post-response.payload';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  onPublishPostEvent = new EventEmitter<boolean>();
  onUpdatePostEvent = new EventEmitter<boolean>();

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

  publish(postRequest: PostRequest): Observable<PostResponse> {
    return this.http.post<PostResponse>(this.POST_URL, postRequest);
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
}
