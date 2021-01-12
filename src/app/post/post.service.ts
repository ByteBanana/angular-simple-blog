import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { error } from 'protractor';
import { AuthService } from '../auth/auth.service';
import { PostRequest } from './post-request.payload';
import { PostResponse } from './post-response.payload';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  @Output() onFetchPosts = new EventEmitter<PostResponse[]>();
  @Output() onFetchPostById = new EventEmitter<PostResponse>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  private POST_URL = 'http://localhost:8080/api/posts';

  fetchAllPost(): any {
    this.http
      .get<PostResponse[]>(this.POST_URL, {
        observe: 'response',
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      })
      .subscribe(
        (response: HttpResponse<PostResponse[]>) => {
          this.onFetchPosts.emit(response.body);
        },
        (error) => {}
      );
  }

  fetchPostById(postId: number): any {
    this.http
      .get<PostResponse>(this.POST_URL + '/' + postId, {
        observe: 'response',
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      })
      .subscribe(
        (response: HttpResponse<PostResponse>) => {
          this.onFetchPostById.emit(response.body);
        },
        (error) => {}
      );
  }

  publish(postRequest: PostRequest) {
    this.http
      .post<PostResponse>(this.POST_URL, postRequest, {
        observe: 'response',
        headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      })
      .subscribe(
        (response: HttpResponse<PostResponse>) => {
          if (response.status === 201) {
            console.log(response.body);
            this.toastr.success('Post published');
            this.router.navigate(['/post/', response.body.postId]);
          }
        },
        (error) => {
          this.toastr.error('Someing went wrong!');
        }
      );
  }
}
