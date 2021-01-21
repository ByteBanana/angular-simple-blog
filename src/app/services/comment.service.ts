import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentRequest } from '../models/comment-request.model';
import { CommentResponse } from '../models/comment-response.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private COMMENT_URL = 'http://localhost:8080/api/comment';

  constructor(private http: HttpClient) {}

  updateComment(
    commentId: number,
    commentRequest: CommentRequest
  ): Observable<any> {
    return this.http.put(`${this.COMMENT_URL}/${commentId}`, commentRequest);
  }

  fetchByCommentId(commentId: number) {
    return this.http.get<CommentResponse>(
      `${this.COMMENT_URL}/${commentId}`,
      {}
    );
  }

  deleteCommentById(commentId: number): Observable<any> {
    return this.http.delete(`${this.COMMENT_URL}/${commentId}`, {});
  }
}
